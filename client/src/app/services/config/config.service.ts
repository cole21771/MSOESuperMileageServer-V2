import {Injectable} from '@angular/core';
import {GraphInfo} from '../../models/GraphInfo';
import {Config} from '../../models/interfaces/Config';
import {ParserVariable} from '../../models/interfaces/ParserVariable';
import {SocketIoService} from '../socket-io/socket-io.service';
import {IncomingData} from '../../models/interfaces/IncomingData';
import {Model} from '../../models/interfaces/Model';
import {isNullOrUndefined} from 'util';
import {View} from '../../models/interfaces/View';
import {ToolbarService} from '../toolbar/toolbar.service';

const FormulaParser = require('hot-formula-parser').Parser;

@Injectable()
export class ConfigService {
  private parser: any;
  private config: Config;
  private graphInfoArray: GraphInfo[];
  private dataModels: IncomingData[];

  constructor(private socketService: SocketIoService,
              private toolbarService: ToolbarService) {
    this.parser = new FormulaParser();
    this.graphInfoArray = [];
    this.dataModels = [];

    this.setupConfig();
  }

  private async setupConfig() {
    this.config = await this.socketService.getSelectedConfig();

    this.dataModels = this.config.models.filter(this.isValidModel.bind(this))
      .map(this.createDataModel.bind(this));

    this.config.graphs.map(graph => {
      const xData = this.getInfoFromLabel(graph.xAxis);
      const yData = this.getInfoArrayFromLabel(graph.yAxis);

      if (xData && yData) {
        this.graphInfoArray.push(new GraphInfo(xData, yData, graph));
      } else {
        console.error('ConfigService, constructor: Error creating graphs');
      }
    });

    this.toolbarService.setView(this.config.views[0]);
  }

  /**
   * If the label provided contains a comma, then it is indeed a MultiGraph and will return true,
   * otherwise returns false
   *
   * @param {string} label the string to be searched for commas
   * @returns {boolean} true if MultiGraph, false otherwise
   */
  private isMultiGraph(label: string): boolean {
    return label.includes(',');
  }

  /**
   * Creates an IncomingData object from the information in a Model object
   *
   * @param {Model} model the model to be converted
   * @returns {IncomingData} the calculated IncomingData object
   */
  private createDataModel(model: Model): IncomingData {
    const labels = this.getLabelsFromFormula(model.formula);
    const incomingData = labels.map<IncomingData>(this.getInfoFromLabel.bind(this));

    const min = this.calculate(incomingData.map<ParserVariable>(data => {
      return {label: data.label, value: data.min};
    }), model.formula);

    const max = this.calculate(incomingData.map<ParserVariable>(data => {
      return {label: data.label, value: data.max};
    }), model.formula);


    if (isNaN(min) || isNaN(max)) {
      throw new Error('ConfigService, createDataModel: min or max is NaN');
    }

    return {
      label: model.label,
      min: min,
      max: max > 0 ? max : undefined,
      units: model.units
    };
  }

  get getModels(): Model[] {
    return this.config.models;
  }

  get getViews(): View[] {
    return this.config ? this.config.views : [];
  }

  /**
   * Given an array of arrays containing a label and number, and a formula string, it calculates
   * the formula given the variables provided
   *
   * @param {any[][]} variables The json that acts as a half-map
   * @param {string} formula The formula to be calculated given the variable's values
   * @returns {number} The result of the calculation
   */
  private calculate(variables: ParserVariable[], formula: string): number {
    variables.forEach(variable => {
      this.parser.setVariable(variable.label, isNullOrUndefined(variable.value) ? -1 : variable.value);
    });

    const results = this.parser.parse(formula);
    if (results.error === '#VALUE!') {
      return 0;
    } else if (results.error) {
      throw new Error(`ConfigService, calculate: ${results.error}`);
    }

    return results.result;
  }

  /**
   * Returns the GraphInfo objects that the service created
   *
   * @returns {GraphInfo[]}
   */
  get getGraphInfo(): GraphInfo[] {
    return this.graphInfoArray;
  }

  /**
   * Getter for getting the labels of the IncomingData
   * @returns {string[]}
   */
  get getLabels(): string[] {
    return this.config.incomingData.map(data => data.label);
  }

  getMultiGraphLabels(label: string): string[] {
    return label.replace(' ', '').split(',');
  }

  private getInfoArrayFromLabel(label: string): IncomingData[] {
    if (this.isMultiGraph(label)) {
      const labels = this.getMultiGraphLabels(label);

      return labels.map<IncomingData>(this.getInfoFromLabel.bind(this))
        .filter(data => !isNullOrUndefined(data));
    } else {
      return [this.getInfoFromLabel(label)];
    }
  }

  private getInfoFromLabel(label: string): IncomingData {
    const labelData = this.config.incomingData.find(data => data.label === label);
    if (labelData) {
      return labelData;
    }

    const modelData = this.dataModels.find(model => model.label === label);
    if (modelData) {
      return modelData;
    }

    return undefined;
  }

  /**
   * Given a model, it checks to make sure it is a valid model by: Making sure the name
   * isn't already used in the IncomingData section, and making sure all variables in
   * the formula exist in the IncomingData section.
   *
   * @param {Model} model The model to be checked for validity
   * @returns {boolean} true if valid, false if invalid
   */
  private isValidModel(model: Model): boolean {
    return !this.getInfoFromLabel(model.label) &&
      this.getLabelsFromFormula(model.formula).every(label => !isNullOrUndefined(this.getInfoFromLabel(label)));
  }

  /**
   * Given a formula string, it returns an array of strings representing the 'variables'
   * in the given formula.
   *
   * @param {string} formula The string to be checked for variables
   * @returns {string[]} An array of strings filled with the variables it found in the formula
   */
  getLabelsFromFormula(formula: string): string[] {
    const items = formula.split(' ');
    return items.filter(item => item.match(/[A-z]+/));
  }
}

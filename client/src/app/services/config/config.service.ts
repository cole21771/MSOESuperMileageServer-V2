import {Injectable} from '@angular/core';
import {Graph} from '../../models/Graph';
import {Config} from '../../models/interfaces/Config';
import {ParserVariable} from '../../models/interfaces/ParserVariable';
import {SocketIoService} from '../socket-io/socket-io.service';
import {IncomingData} from '../../models/interfaces/IncomingData';
import {Model} from '../../models/interfaces/Model';
import {isNullOrUndefined} from 'util';
import {View} from '../../models/interfaces/View';
import {ToolbarService} from '../toolbar/toolbar.service';
import {GraphProperties} from '../../models/interfaces/GraphProperties';

const FormulaParser = require('hot-formula-parser').Parser;

@Injectable()
export class ConfigService {
  private parser: any;
  private config: Config;
  private dataModels: IncomingData[];

  constructor(private socketService: SocketIoService) {
    this.parser = new FormulaParser();
    this.dataModels = [];

    this.socketService.getSelectedConfig().then((config) => {
      this.config = config;

      this.dataModels = this.config.models.filter(this.isValidModel.bind(this))
        .map(this.createDataModel.bind(this));
    }).catch((errorMessage) => {
      throw new Error('ConfigService, setupConfig: ' + errorMessage);
    });
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
    return this.config ? this.config.views : undefined;
  }

  getGraph(graphProperties: GraphProperties): Graph {
    if (isNullOrUndefined(graphProperties)) {
      throw new Error('ConfigService, getGraph: parameters are null or undefined');
    }

    const yData = this.getInfoArrayFromLabel(graphProperties.yAxis);

    if (isNullOrUndefined(yData)) {
      throw new Error('ConfigService, getGraph: yData was could not be found');
    } else {
      return new Graph(yData, graphProperties);
    }
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

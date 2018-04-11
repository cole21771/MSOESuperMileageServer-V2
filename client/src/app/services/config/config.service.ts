import {Injectable} from '@angular/core';
import {Graph} from '../../models/Graph';
import {Config} from '../../models/interfaces/Config';
import {SocketIoService} from '../socket-io/socket-io.service';
import {IncomingData} from '../../models/interfaces/IncomingData';
import {Model} from '../../models/interfaces/Model';
import {isNullOrUndefined} from 'util';
import {View} from '../../models/interfaces/View';
import {GraphProperties} from '../../models/interfaces/GraphProperties';

const FormulaParser = require('hot-formula-parser').Parser;

@Injectable()
export class ConfigService {
  private parser: any;
  private config: Config;

  constructor(private socketService: SocketIoService) {
    this.parser = new FormulaParser();

    this.socketService.getSelectedConfig().then((config) => {
      this.config = config;
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

    const modelData = this.config.models.find(model => model.label === label);
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

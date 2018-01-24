import {Injectable} from '@angular/core';
import {GraphInfo} from '../../models/GraphInfo';
import {Graph} from '../../interfaces/Graph';
import {Config} from '../../interfaces/Config';
import {SocketIoService} from '../socket-io/socket-io.service';
import {IncomingData} from '../../interfaces/IncomingData';
import {Model} from '../../interfaces/Model';

const FormulaParser = require('hot-formula-parser').Parser;

@Injectable()
export class ConfigService {

  private parser: any;

  private config: Config;

  private graphs: GraphInfo[];
  private dataModels: IncomingData[];

  constructor(private socketService: SocketIoService) {
    this.parser = new FormulaParser;
    this.graphs = [];
    this.dataModels = [];

    this.socketService.getSelectedConfig().then((config: Config) => {
      this.config = config;

      // Sets of models
      config.models.forEach((model: Model) => {
        if (this.isValidModel(model)) {
          this.dataModels.push(this.createDataModel(model));
        }
      });

      // Sets of graphs
      config.graphs.forEach((graph: Graph) => { // TODO Rethink some this stuff considering GraphInfo and DataService
        const xData = this.getIncomingDataOrModelData(graph.xAxis);
        const yData = this.getIncomingDataOrModelData(graph.yAxis);
        if (xData && yData) {
          this.graphs.push(new GraphInfo(xData, graph));
        }
      });
    });
  }

  private createDataModel(model: Model): IncomingData {
    const labels = this.getLabelsFromModel(model);
    labels.forEach((label: string) => {
      const data = this.getLabelData(label);
      this.parser.setVariable(label, data.min ? data.min : 0);
    });
    const min = this.parser.parse(model.formula);

    labels.forEach((label: string) => {
      const data = this.getLabelData(label);
      this.parser.setVariable(label, data.max ? data.max : 0);
    });
    const max = this.parser.parse(model.formula);

    if (!min.error && !max.error) {
      return {
        label: model.label,
        min: min.result,
        max: max.result === 0 ? null : max.result,
        units: model.units
      };
    } else {
      throw new Error('Formula calculation had an error');
    }
  }

  get getGraphs(): GraphInfo[] {
    return this.graphs;
  }

  get getOrder(): string[] {
    return this.config.incomingData.map((data: IncomingData) => data.label);
  }

  private getLabelData(label: string): IncomingData {
    return this.config.incomingData.find((data: IncomingData) => data.label === label);
  }

  private getIncomingDataOrModelData(label: string): IncomingData {
    const labelData = this.getLabelData(label);
    const modelData = this.dataModels.find((model: IncomingData) => model.label === label);

    if (labelData) {
      return labelData;
    } else if (modelData) {
      return modelData;
    }

    return undefined;
  }

  private isValidModel(model: Model): boolean {
    let valid = true;
    if (!this.getLabelData(model.label)) {
      const labels = this.getLabelsFromModel(model);
      valid = labels.every((label: string) => !!this.getLabelData(label));
    } else {
      valid = false;
    }

    return valid;
  }

  private getLabelsFromModel(model: Model): string[] {
    const items = model.formula.split(' ');
    return items.filter((item: string) => item.match(/[A-z]+/));
  }
}

import {Injectable} from '@angular/core';
import {Chart} from "../../models/Chart";
import {Graph} from "../../interfaces/Graph";
import {Config} from "../../interfaces/Config";
import {SocketIoService} from "../socket-io/socket-io.service";
import {IncomingData} from "../../interfaces/IncomingData";
import {Model} from "../../interfaces/Model";

const FormulaParser = require('hot-formula-parser').Parser;

@Injectable()
export class ConfigService {

  private parser: any;

  private config: Config;

  private graphs: Chart[];
  private dataModels: IncomingData[];

  constructor(private socketService: SocketIoService) {
    this.parser = new FormulaParser;
    this.graphs = [];
    this.dataModels = [];

    this.socketService.getSelectedConfig().then((config: Config) => {
      this.config = config;

      config.models.forEach((model: Model) => {
        if (this.isValidModel(model)) {

          // TODO create IncomingData based on items from formula

          /*let data: IncomingData = {
            label: model.label;
          min:
            }
          this.dataModels.push(data);*/
        }
      });

      config.graphs.forEach((graph: Graph) => {
        let data = this.getLabelData(graph.xAxis);
        if (data && this.getLabelData(graph.yAxis)) {
          this.graphs.push(new Chart(data, graph));
        }
      });
    });
  }

  get getGraphs(): Chart[] {
    return this.graphs;
  }

  private getLabelData(label: string): IncomingData {
    return this.config.incomingData.find((data: IncomingData) => data.label === label);
  }

  private doesIncomingDataOrModelExist(label: string): boolean {
    return !!this.getLabelData(label) ||
      !!this.dataModels.find((model: IncomingData) => model.label === label);
  }

  private isValidModel(model: Model): boolean {
    let valid = true;
    if (!this.getLabelData(model.label)) {
      let labels = this.getLabelsFromModel(model);
      valid = labels.every((label: string) => !!this.getLabelData(label));
    } else {
      valid = false;
    }

    return valid;
  }

  getLabelsFromModel(model: Model): string[] {
    let items = model.formula.split(" ");
    return items.filter((item: string) => item.match(/[A-z]+/));
  }
}

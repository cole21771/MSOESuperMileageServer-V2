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

  private config: Config;

  private graphs: Chart[];
  private models: Model[];

  constructor(private socketService: SocketIoService) {
    this.graphs = [];
    this.models = [];

    this.socketService.getSelectedConfig().then((config: Config) => {
      this.config = config;

      config.models.forEach((model: Model) => {
        if (this.isValidModel(model)) {
          this.models.push(model);
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

  private isValidModel(model: Model): boolean {
    let valid = true;
    if (!this.getLabelData(model.label)) {
      let items = model.formula.split(" ");
      items.forEach((item: string) => {
        if (item.match(/[A-z]+/)) {
          if (!this.getLabelData(item))
            valid = false;
        }
      });
    } else {
      valid = false;
    }

    return valid;
  }
}

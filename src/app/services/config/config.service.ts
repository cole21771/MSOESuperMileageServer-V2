import {Injectable} from '@angular/core';
import {Chart} from "../../models/Chart";
import {Graph} from "../../interfaces/Graph";
import {Config} from "../../interfaces/Config";
import {SocketIoService} from "../socket-io/socket-io.service";
import {IncomingData} from "../../interfaces/IncomingData";

@Injectable()
export class ConfigService {

  private graphs: Chart[];
  private config: Config;

  constructor(private socketService: SocketIoService) {
    this.graphs = [];

    this.socketService.getSelectedConfig().then((config: Config) => {
      this.config = config;

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
}

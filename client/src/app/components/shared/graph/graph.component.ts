import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GraphInfo} from '../../../models/GraphInfo';
import {DataService} from '../../../services/data/data.service';
import {ConfigService} from '../../../services/config/config.service';
import {Graph} from "../../../models/interfaces/Graph";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnInit {
  @Input() graph: Graph;
  public graphInfo: GraphInfo;

  constructor(private configService: ConfigService,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.graphInfo = this.configService.getGraphInfo.find((graphInfo) =>
      graphInfo.xLabel === this.graph.xAxis && graphInfo.yLabel === this.graph.yAxis);

    this.dataService.dataNotifier.subscribe(() => {
      const x = this.dataService.getLatestData(this.graphInfo.xLabel);
      const yArray = this.graphInfo.yLabels.map((label) => {
        return this.dataService.getLatestData(label);
      });

      if (isNaN(x) || !yArray.every(y => !isNaN(y))) {
        throw new Error(`GraphComponent, ngOnInit: ${this.graphInfo.title} encountered a problem with getting data from DataService`);
      } else {
        this.graphInfo.addData(x, yArray);
      }
    });
  }
}

import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Graph} from '../../../models/Graph';
import {DataService} from '../../../services/data/data.service';
import {ConfigService} from '../../../services/config/config.service';
import {GraphProperties} from '../../../models/interfaces/config/GraphProperties';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnInit {
  @Input() graphProperties: GraphProperties;
  public graph: Graph;

  constructor(private configService: ConfigService,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.graph = this.configService.getGraph(this.graphProperties);

    if (this.graph.yLabel === 'LocationSpeed') {
      this.dataService.locationNotifier.subscribe((locationArr) => {
        const yArray = [locationArr[2]];

        this.graph.addData(Math.random(), yArray);
      });
    } else {
      this.dataService.dataNotifier.subscribe(() => {
        const x = this.dataService.getLatestData(this.graph.xLabel);
        const yArray = this.graph.yLabels.map((label) => {
          return this.dataService.getLatestData(label);
        });

        if (isNaN(x) || !yArray.every(y => !isNaN(y))) {
          throw new Error(`GraphComponent, ngOnInit: ${this.graph.getTitle} encountered a problem with getting data from DataService`);
        } else {
          this.graph.addData(x, yArray);
        }
      });
    }
  }
}

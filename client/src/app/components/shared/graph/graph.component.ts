import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GraphInfo} from '../../../models/GraphInfo';
import {DataService} from '../../../services/data/data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnInit {
  @Input() graphInfo: GraphInfo;
  @Input() showXAxis: boolean;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
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

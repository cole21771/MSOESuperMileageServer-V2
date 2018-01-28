import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GraphInfo} from '../../models/GraphInfo';
import {DataService} from '../../services/data/data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent {
  @Input() graphInfo: GraphInfo;
  @Input() showXAxis: boolean;

  constructor(private dataService: DataService) {
    this.dataService.onReady().subscribe(() => {
      if (this.graphInfo.isValid) {
        this.dataService.dataNotifier().subscribe(() => {
          const x = this.dataService.getLatestData(this.graphInfo.xLabel);
          const y = this.dataService.getLatestData(this.graphInfo.yLabel);
          if (isNaN(x) || isNaN(y)) {
            throw new Error(`${this.graphInfo.title} encountered a problem with getting data from DataService`);
          } else {
            this.graphInfo.addData(x, y);
          }
        });
      } else {
        throw new Error('Graph Information is not valid!');
      }
    });
  }
}

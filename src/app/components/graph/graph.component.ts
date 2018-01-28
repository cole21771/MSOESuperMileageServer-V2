import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GraphInfo} from '../../models/GraphInfo';
import {DataService} from '../../services/data/data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnInit {
  @Input() graphInfo: GraphInfo;
  @Input() showXAxis: boolean;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    if (this.graphInfo.isValid) {
      this.dataService.dataNotifier().subscribe(() => {
        const x = this.dataService.getLatestData(this.graphInfo.xLabel);
        const y = this.dataService.getLatestData(this.graphInfo.yLabel);
        if (x && y) {
          this.graphInfo.addData(x, y);
        } else {
          throw new Error(`${this.graphInfo.title} encountered a problem with getting data from DataService`);
        }
      });
    } else {
      throw new Error('Graph Information is not valid!');
    }
  }
}

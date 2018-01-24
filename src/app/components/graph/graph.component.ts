import {Component, Input, ViewEncapsulation} from '@angular/core';
import {GraphInfo} from '../../models/GraphInfo';
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent {

  constructor(private dataService: DataService) {
    dataService.getEmitterFor(this.chart.xAxisName).subscribe((data: number) => {
      this.chart.addData(data);
    });
  }

  @Input() chart: GraphInfo;
  @Input() showXAxis: boolean;
}

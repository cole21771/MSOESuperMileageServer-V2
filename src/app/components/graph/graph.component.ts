import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Chart} from '../../models/Chart';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent {
  @Input() chart: Chart;
  @Input() showXAxis: boolean;
}

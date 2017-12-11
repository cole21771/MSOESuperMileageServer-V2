import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Graph} from '../../models/Graph';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent {
  @Input() graph: Graph;
  @Input() showXAxis: boolean;
}

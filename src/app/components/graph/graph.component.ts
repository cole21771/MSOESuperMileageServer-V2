import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Graph} from '../../models/Graph';

@Component({
  selector: 'app-graph',
  template: `
    <ngx-charts-line-chart id="chart" [view]="view"
                           [scheme]="graph.color"
                           [results]="graph.chartData"
                           [gradient]="gradient"
                           xAxis="true"
                           yAxis="true"
                           showXAxisLabel="true"
                           showYAxisLabel="true"
                           [xAxisLabel]="graph.xAxisName"
                           [yAxisLabel]="graph.yAxisName"
                           autoScale=true></ngx-charts-line-chart>`,
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent {

  @Input() theme: String;
  @Input() graph: Graph;

  view: any[] = [700, 500];
  gradient: Boolean = false;

  constructor() {
  }


}

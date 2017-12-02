import {Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Graph} from "../../models/Graph";

@Component({
  selector: 'app-graph',
  template: `
    <ngx-charts-line-chart [view]="view"
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
export class GraphComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes.data.currentValue);
  }

  @Input() theme: String;
  @Input() graph: Graph;

  view: any[] = [700, 500];
  gradient: Boolean = false;

  constructor() {
  }


}

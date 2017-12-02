import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

declare let d3: any;

@Component({
  selector: 'app-graph',
  template: '<nvd3 [class]="theme + \' graph\'" [options]="options" [data]="data"></nvd3>',
  styleUrls: ['./graph.component.css', '../../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnInit {

  @Input() theme: String;
  @Input() data;
  options: any;

  constructor() {
  }

  ngOnInit() {
    this.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function (d) {
          return d.x;
        },
        y: function (d) {
          return d.y;
        },
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'Time (ms)'
        },
        yAxis: {
          axisLabel: 'Voltage (v)',
          tickFormat: function (d) {
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        },
        showLegend: false,
        duration: 0
      }
    };
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {LineChartComponent} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-multi-graph',
  templateUrl: './multi-graph.component.html',
  styleUrls: ['./multi-graph.component.scss']
})
export class MultiGraphComponent extends LineChartComponent implements OnInit {
  @Input() graphProperties: any;

  ngOnInit() {
  }

}

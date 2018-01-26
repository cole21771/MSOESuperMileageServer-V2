import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GraphInfo} from '../../models/GraphInfo';
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnInit{
  @Input() graphInfo: GraphInfo;
  @Input() showXAxis: boolean;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    if (this.graphInfo.isValid) {
      //this.graphInfo.

      this.dataService.dataNotifier().subscribe(() => {

      });
    } else {
      throw new Error("Graph Information is not valid!");
    }
  }
}

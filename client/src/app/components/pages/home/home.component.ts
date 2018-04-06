import {Component, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {ConfigService} from '../../../services/config/config.service';
import {Tile} from '../../../models/interfaces/Tile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public tiles: Tile[];

  constructor(private toolbarService: ToolbarService,
              private configService: ConfigService) {
    this.tiles = [
      {
        name: 'GraphTest',
        subName: 'MPH',
        rows: 2,
        columns: 2,
        type: 'Graph',
        data: {
          yAxis: 'Speed',
          xAxis: 'Time',
          colors: ['#f00']
        }
      },
      {
        name: 'NumberTest',
        subName: 'RPM',
        rows: 1,
        columns: 1,
        type: 'NumberDisplay',
        data: {
          label: 'Motor_RPM'
        }
      },
      {
        name: 'NumberTest2',
        subName: 'V',
        rows: 1,
        columns: 1,
        type: 'NumberDisplay',
        data: {
          label: 'Voltage'
        }
      },
      {
        name: 'Current',
        subName: 'A',
        rows: 1,
        columns: 2,
        type: 'NumberDisplay',
        data: {
          label: 'Current'
        }
      },
      {
        name: 'Throttle Voltage',
        subName: 'V',
        rows: 1,
        columns: 2,
        type: 'Graph',
        data: {
          yAxis: 'Throttle_Voltage',
          xAxis: 'Time',
          colors: ['#f0f']
        }
      }

    ];
  }

  ngOnInit() {
    /*// Sets up listener for when the view changes
    this.toolbarService.viewChanged.subscribe((view: View) => {
      this.selectedGraphInfoArray = this.configService.getGraphInfo.filter((graph, index) => view.graphs.includes(index));
    });

    this.toolbarService.emitLastView();*/
  }
}

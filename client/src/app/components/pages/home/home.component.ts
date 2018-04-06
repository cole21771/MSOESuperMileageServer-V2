import {Component, OnInit} from '@angular/core';
import {GraphInfo} from '../../../models/GraphInfo';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {ConfigService} from '../../../services/config/config.service';
import {View} from '../../../models/interfaces/View';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public selectedGraphInfoArray: GraphInfo[];
  public cols = 2;

  constructor(private toolbarService: ToolbarService,
              private configService: ConfigService) {
    this.selectedGraphInfoArray = [];
  }

  ngOnInit() {
    // Sets up listener for when the "switch graph mode" button is clicked
    this.toolbarService.graphModeSwitched.subscribe(this.attemptResize.bind(this));

    // Sets up listener for when the view changes
    this.toolbarService.viewChanged.subscribe((view: View) => {
      this.selectedGraphInfoArray = this.configService.getGraphInfo.filter((graph, index) => view.graphs.includes(index));
    });

    this.toolbarService.emitLastView();
  }

  attemptResize() {
    const parent = document.getElementsByClassName('tile mat-elevation-z6')[0];

    requestAnimationFrame(() => {
      this.cols = Math.floor(parent.clientWidth / 420 + 1);
    });
  }
}

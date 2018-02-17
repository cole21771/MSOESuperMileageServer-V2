import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketIoService} from '../../services/socket-io/socket-io.service';
import {GraphInfo} from '../../models/GraphInfo';
import {ToolbarService} from '../../services/toolbar/toolbar.service';
import {ConfigService} from '../../services/config/config.service';
import {View} from "../../interfaces/View";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public selectedGraphInfoArray: GraphInfo[];
  public location: any;
  public cols = 2;

  private locationSub: any;

  constructor(private toolbarService: ToolbarService,
              private configService: ConfigService,
              private socketService: SocketIoService) {
    this.selectedGraphInfoArray = [];
  }

  ngOnInit() {
    this.toolbarService.viewChanged().subscribe((view: View) => {
        this.selectedGraphInfoArray = this.configService.getGraphInfo.filter((graph, index) => view.graphs.includes(index));
      }
    );

    this.locationSub = this.socketService.getLocation()
      .subscribe((location) => this.location = location);

    this.toolbarService.switchGraphListener()
      .subscribe(this.onResize.bind(this));
  }

  ngOnDestroy() {
    this.locationSub.unsubscribe();
  }

  onResize() {
    const parent = document.getElementsByClassName('tile mat-elevation-z6')[0];

    requestAnimationFrame(() => {
      this.cols = Math.floor(parent.clientWidth / 420 + 1);
    });
  }
}

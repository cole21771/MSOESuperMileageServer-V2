import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketIoService} from '../../services/socket-io/socket-io.service';
import {GraphInfo} from '../../models/GraphInfo';
import {CommunicatorService} from '../../services/communicator/communicator.service';
import {ConfigService} from '../../services/config/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public graphInfoArray: GraphInfo[];
  public selectedGraphInfoArray: GraphInfo[];
  public location: any;
  public cols = 2;

  private locationSub: any;

  constructor(private communicator: CommunicatorService,
              private configService: ConfigService,
              private socketService: SocketIoService) {
    this.graphInfoArray = [];
  }

  ngOnInit() {
    this.graphInfoArray = this.configService.getGraphInfo;
    this.selectedGraphInfoArray = [...this.graphInfoArray];

    this.locationSub = this.socketService.getLocation()
      .subscribe((location) => this.location = location);

    this.communicator.refreshButtonClicked()
      .subscribe(() => this.onResize());

    this.communicator.viewChanged().subscribe((graphs: number[]) => {
      this.selectedGraphInfoArray = this.graphInfoArray.filter((graph, index) => graphs.includes(index));
    });
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

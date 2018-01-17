import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketIoService} from '../../services/socket-io/socket-io.service';
import {Chart} from '../../models/Chart';
import {CommunicatorService} from '../../services/communicator/communicator.service';
import {Config} from "../../models/Config";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public graphs: Chart[] = [];
  public location: any;
  public cols = 2;

  private dataSub: any;
  private selectedConfiguration: any;
  private locationSub: any;

  constructor(private socketService: SocketIoService, private communicator: CommunicatorService) {
    this.socketService.getSelectedConfig()
      .then((selectedConfiguration: Config) => {
        this.selectedConfiguration = selectedConfiguration;

        selectedConfiguration.graphs.forEach((graphInfo) => {
          this.graphs.push(new Chart(graphInfo));
        });
      });
  }

  ngOnInit() {
    this.dataSub = this.socketService.getData()
      .subscribe((data) => {
        this.graphs.forEach((graph: Chart, index: number) => {
          graph.addData(data[index]);
        });
      });

    this.locationSub = this.socketService.getLocation()
      .subscribe((location) => this.location = location);

    this.communicator.refreshButtonClicked()
      .subscribe(() => this.onResize());
  }

  onResize() {
    const parent = document.getElementsByClassName('tile mat-elevation-z6')[0];

    requestAnimationFrame(() => {
      this.cols = Math.floor(parent.clientWidth / 420 + 1);
    });
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.locationSub.unsubscribe();
  }
}

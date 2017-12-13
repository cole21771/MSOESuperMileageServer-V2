import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketIoService} from '../../services/socket-io/socket-io.service';
import {Graph} from '../../models/Graph';
import {CommunicatorService} from '../../services/communicator/communicator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  socketService: SocketIoService;
  communicator: CommunicatorService;

  dataFormat: any;
  graphs: Graph[] = [];
  location: any;

  dataSub: any;
  locationSub: any;

  cols = 2;

  constructor(socketService: SocketIoService, communicator: CommunicatorService) {
    this.socketService = socketService;
    this.communicator = communicator;

    this.socketService.getIncomingDataFormat()
      .then((dataFormat: any) => {
        this.dataFormat = dataFormat;
        dataFormat.data.forEach((graphInfo) => {
          this.graphs.push(new Graph(graphInfo));
        });
      });
  }

  ngOnInit() {
    this.dataSub = this.socketService.getData()
      .subscribe((data) => {
        this.graphs.forEach((graph: Graph, index: number) => {
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

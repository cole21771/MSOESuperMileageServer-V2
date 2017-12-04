import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketIoService} from '../../services/socket-io/socket-io.service';
import {Graph} from '../../models/Graph';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  socketService: SocketIoService;

  dataFormat: any;
  graphs: Graph[] = [];
  location: any;

  dataSub: any;
  locationSub: any;

  cols = 2;
  graphView: number[];

  constructor(socketService: SocketIoService) {
    this.socketService = socketService;

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

    setTimeout(() => {
      this.onResize();
    }, 250);
  }

  onResize() {
    let parent = document.getElementById('tile');
    this.cols = Math.floor(parent.clientWidth / 420 + 1);

    setTimeout(() => {
      parent = document.getElementById('tile');
      this.graphView = [parent.clientWidth - 40, parent.clientHeight - 65];
    }, 250);
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.locationSub.unsubscribe();
  }
}

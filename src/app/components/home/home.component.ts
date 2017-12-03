import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketIoService} from '../../services/socket-io/socket-io.service';
import {ThemeService} from '../../services/theme/theme.service';
import {Graph} from '../../models/Graph';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  socketService: SocketIoService;
  themeService: ThemeService;

  theme: String = 'dark-theme';

  dataFormat: any;
  graphs: Graph[] = [];
  location: any;

  dataSub: any;
  locationSub: any;

  constructor(socketService: SocketIoService, themeService: ThemeService) {
    this.socketService = socketService;
    this.themeService = themeService;

    this.socketService.getIncomingDataFormat()
      .then((dataFormat: any) => {
        this.dataFormat = dataFormat;
        dataFormat.data.forEach((graphInfo) => {
          this.graphs.push(new Graph(graphInfo.label, graphInfo.color, 'Time', graphInfo.label, graphInfo.units));
        });
      });
  }

  ngOnInit() {
    this.themeService.getTheme()
      .subscribe(value => {
        this.theme = value;
      });

    this.themeService.forceUpdate();

    this.dataSub = this.socketService.getData()
      .subscribe((data) => {
        this.graphs.forEach((graph: Graph, index: number) => {
          graph.addData(data[index]);
        });
      });

    this.locationSub = this.socketService.getLocation()
      .subscribe((location) => this.location = location);

/*    setInterval(() => {
      this.socketService.sendData(Math.random() * 10);
    }, 250);*/
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.locationSub.unsubscribe();
  }
}

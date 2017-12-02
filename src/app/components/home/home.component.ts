import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketIoService} from '../../services/socket-io/socket-io.service';
import {ThemeService} from '../../services/theme/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  socketService: SocketIoService;
  themeService: ThemeService;

  theme: String = 'dark-theme';
  data: any;
  location: any;

  dataSub: any;
  locationSub: any;

  dataLabels: any = [
    {
      label: 'Speed',
      color: '#f00',
      min: 0,
      max: 35,
      units: 'MPH',
      displayAlways: false
    },
    {
      label: 'Motor RPM',
      color: '#0f0',
      min: 0,
      max: 3500,
      units: 'RPM',
      displayAlways: false
    },
    {
      label: 'Joules',
      color: '#00f',
      min: 0,
      max: 1000000,
      units: 'J',
      displayAlways: true
    },
    {
      label: 'Volts',
      color: '#0ff',
      min: 0,
      max: 30,
      units: 'V',
      displayAlways: false
    },
    {
      label: 'Current',
      color: '#f0f',
      min: 0,
      max: 50,
      units: 'A',
      displayAlways: false
    },
    {
      label: 'Lap Number',
      color: '#ff7f00',
      min: 0,
      max: 10,
      units: '',
      displayAlways: true
    }
  ];

  constructor(socketService: SocketIoService, themeService: ThemeService) {
    this.socketService = socketService;
    this.themeService = themeService;
  }

  ngOnInit() {
    this.themeService.getTheme()
      .subscribe(value => {
        this.theme = value;
      });

    this.themeService.forceUpdate();

    this.dataSub = this.socketService.getData()
      .subscribe((data) => this.data = data);

    this.locationSub = this.socketService.getLocation()
      .subscribe((location) => this.location = location);

    setInterval(() => {
      this.socketService.sendData(this.sinAndCos());
    }, 250);
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.locationSub.unsubscribe();
  }

  sinAndCos() {
    const sin = [], sin2 = [],
      cos = [];

    // Data is represented as an array of {x,y} pairs.
    for (let i = 0; i < 100; i++) {
      sin.push({x: i, y: Math.sin(i / 10)});
      sin2.push({x: i, y: i % 10 === 5 ? null : Math.sin(i / 10) * 0.25 + 0.5});
      cos.push({x: i, y: .5 * Math.cos(i / 10 + 2) + Math.random() / 10});
    }

    // Line chart data should be sent as an array of series objects.
    return [
      {
        values: sin,      // values - represents the array of {x,y} data points
        key: 'Sine Wave', // key  - the name of the series.
        color: '#ff7f0e'  // color - optional: choose your own line color.
      },
      {
        values: cos,
        key: 'Cosine Wave',
        color: '#2ca02c'
      },
      {
        values: sin2,
        key: 'Another sine wave',
        color: '#7777ff',
        area: true      // area - set to true if you want this line to turn into a filled area chart.
      }
    ];
  }
}

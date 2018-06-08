import { Component, OnInit } from '@angular/core';
import {Marker} from '../../../models/interfaces/Marker';
import {DataService} from '../../../services/data/data.service';

@Component({
  selector: 'app-lap-time',
  templateUrl: './lap-time.component.html',
  styleUrls: ['./lap-time.component.scss']
})
export class LapTimeComponent implements OnInit {
  public times: number[];
  public currentLapTime: number;
  public lastTime: number;

  constructor(private dataService: DataService) {
    this.times = [];
    this.lastTime = 0;
  }

  ngOnInit() {
    this.dataService.getMarkerEmitter('Lap Number').subscribe((marker: Marker) => {
      this.times.push(this.currentLapTime);
      this.lastTime = this.dataService.getLatestData('Time');
    });

    this.dataService.dataNotifier.subscribe(() => {
      this.currentLapTime = this.dataService.getLatestData('Time') - this.lastTime;
    });
  }

}

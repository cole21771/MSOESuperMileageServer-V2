import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../services/data/data.service';
import {Marker} from '../../../models/interfaces/Marker';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {
  @Input() numberProperties: { label: string };
  public value: number;
  public lastTime = 0;
  public times: number[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    switch (this.dataService.getDataType(this.numberProperties.label)) {
      case 'Data':
      case 'Model':
        this.dataService.dataNotifier.subscribe(() => {
          this.value = this.dataService.getLatestData(this.numberProperties.label);
        });
        break;
      case 'Marker':
        this.dataService.getMarkerEmitter(this.numberProperties.label).subscribe((marker: Marker) => {
          this.value = marker.marker;
        });
        break;
      case 'LapTime':
        this.dataService.getMarkerEmitter('Lap Number').subscribe((marker: Marker) => {
          this.times.push(this.value);
          this.lastTime = this.dataService.getLatestData('Time');
        });

        this.dataService.dataNotifier.subscribe(() => {
          this.value = this.dataService.getLatestData('Time') - this.lastTime;
        });
        break;
      default:
        console.error('NumberComponent, ngOnInit:', `Couldn't get type for NumberDisplay ${this.numberProperties.label}`);
    }
  }
}

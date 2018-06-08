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
      case 'LocationData':
        this.dataService.locationNotifier.subscribe((locationArr) => {
          this.value = locationArr[2];
        });
        break;
      default:
        console.error('NumberComponent, ngOnInit:', `Couldn't get type for NumberDisplay ${this.numberProperties.label}`);
    }
  }
}

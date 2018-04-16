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
        this.dataService.markerNotifier.subscribe((marker: Marker) => {
          if (this.numberProperties.label === marker.name) {
            this.value = Number.parseFloat(marker.marker);
          }
        });
        break;
    }


  }

}

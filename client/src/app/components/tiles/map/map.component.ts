import {Component, Input, OnInit} from '@angular/core';
import {MapProperties} from '../../../models/interfaces/config/MapProperties';
import {DataService} from '../../../services/data/data.service';
import {LocationInfo} from '../../../models/interfaces/LocationInfo';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() mapProperties: MapProperties;
  public locations: LocationInfo[];

  constructor(private dataService: DataService) {
    this.locations = [];
  }

  async ngOnInit() {
    this.dataService.locationNotifier.subscribe((locationInfo) => {
      console.log(locationInfo);
    });

    /*this.locations.push({lat: this.mapProperties.lat, long: this.mapProperties.long, speed: 10});
    for (let i = 1; i < 200; i++) {
      const lastLoc = this.locations[i - 1];
      this.locations.push({
        lat: lastLoc.lat + (Math.random() - .5) / 1000,
        long: lastLoc.long + (Math.random() - .5) / 1000,
        speed: 10
      });
      await new Promise(resolve => setTimeout(resolve, 500));
    }*/
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {MapProperties} from '../../../models/interfaces/config/MapProperties';
import {DataService} from '../../../services/data/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() mapProperties: MapProperties;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.locationNotifier.subscribe((locationInfo) => {

    });
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../services/data/data.service';
import {DataPoint} from '../../../models/interfaces/DataPoint';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {
  @Input() numberProperties: { label: string };
  public results: DataPoint[];

  constructor(private dataService: DataService) {
    this.results = [{name: 'Joules', value: 0}];
  }

  ngOnInit() {
    this.dataService.dataNotifier.subscribe(() => {
      this.results[0].value = this.dataService.getLatestData(this.numberProperties.label);
      this.results = [...this.results];
    });
  }

}

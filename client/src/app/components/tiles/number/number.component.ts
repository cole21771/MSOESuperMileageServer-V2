import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../services/data/data.service';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {
  @Input() numberProperties: { label: string };
  public number: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.dataNotifier.subscribe(() => {
      this.number = this.dataService.getLatestData(this.numberProperties.label);
    });
  }

}

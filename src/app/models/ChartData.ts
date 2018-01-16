import {DataPoint} from './DataPoint';

export class ChartData {
  name: String;
  series: DataPoint[];

  constructor(name: String) {
    this.name = name;
    this.series = [];
  }
}

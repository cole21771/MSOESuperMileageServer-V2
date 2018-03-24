import {DataPoint} from './DataPoint';

export class ChartData {
  name: string;
  series: DataPoint[];

  constructor(name: string) {
    this.name = name;
    this.series = [];
  }
}

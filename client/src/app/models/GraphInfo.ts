import {ChartData} from './ChartData';
import {DataPoint} from './DataPoint';
import {IncomingData} from '../interfaces/IncomingData';
import {Graph} from '../interfaces/Graph';
import {isNull, isNullOrUndefined} from 'util';

export class GraphInfo {
  title: string;
  color: any = {
    domain: []
  };
  xLabel: string;
  yLabel: string;
  xName: string;
  yName: string;
  units: string;
  min: number;
  max: number;
  chartData: ChartData[];

  constructor(xData: IncomingData, yData: IncomingData, graph: Graph) {
    this.xLabel = graph.xAxis;
    this.yLabel = graph.yAxis;

    this.xName = this.xLabel.replace('_', ' ');
    this.yName = this.yLabel.replace('_', ' ');
    this.title = `${this.yName} vs ${this.xName}`;

    this.color.domain.push(graph.color);
    this.units = yData.units;
    this.min = yData.min;
    this.max = yData.max;

    this.chartData = [new ChartData(this.title)]; // TODO Add support for multiple lines on a graph
  }

  addData(x: number, y: number): void {
    this.chartData[0].series.push(new DataPoint(`${x}`, y));

    if (this.chartData[0].series.length > 100) {
      this.chartData[0].series.shift();
    }

    this.chartData = [...this.chartData];
  }

  // TODO Fix this
  get isValid(): boolean {
    return true;
  }
}

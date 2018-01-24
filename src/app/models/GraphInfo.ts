import {ChartData} from './ChartData';
import {DataPoint} from './DataPoint';
import {IncomingData} from '../interfaces/IncomingData';
import {Graph} from '../interfaces/Graph';

export class GraphInfo {
  title: string;
  color: any = {
    domain: []
  };
  xAxisName: string;
  yAxisName: string;
  units: String;
  min: number;
  max: number;
  chartData: ChartData[];

  constructor(data: IncomingData, graph: Graph) {
    graph.xAxis = graph.xAxis.replace('_', ' ');
    graph.yAxis = graph.yAxis.replace('_', ' ');


    this.title = `${graph.yAxis} vs ${graph.xAxis}`;
    this.color.domain.push(graph.color);
    this.xAxisName = graph.xAxis;
    this.yAxisName = graph.yAxis;
    this.units = data.units;
    this.min = data.min;
    this.max = data.max;

    this.chartData = [new ChartData(this.title)];
  }

  addData(data: number): void { // TODO account for formula
    this.chartData[0].series.push(new DataPoint(Date.now(), data));

    if (this.chartData[0].series.length > 100) {
      this.chartData[0].series.shift();
    }

    this.chartData = [...this.chartData];
  }

}

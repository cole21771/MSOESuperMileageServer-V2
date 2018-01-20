import {ChartData} from './ChartData';
import {DataPoint} from './DataPoint';
import {Graph} from "../interfaces/Graph";
import {IncomingData} from "../interfaces/IncomingData";

export class Chart {
  title: String;
  color: any = {
    domain: []
  };
  xAxisName: String;
  yAxisName: String;
  units: String;
  min: number;
  max: number;
  chartData: ChartData[];

  /*constructor(graphInfo) {
    this.color.domain.push(graphInfo.color);
    this.xAxisName = 'Time';
    this.yAxisName = graphInfo.label;
    this.units = graphInfo.units;
    this.title = this.yAxisName + ' vs ' + this.xAxisName;
    this.min = graphInfo.min;
    this.max = graphInfo.max;
    this.displayAlways = graphInfo.displayAlways;
    this.showGraph = graphInfo.showGraph;

    this.chartData = [new ChartData(this.title)];
  }*/

  constructor(data: IncomingData, graph: Graph) {
    this.title = `${graph.yAxis} vs ${graph.xAxis}`;
    this.color.domain.push(graph.color);
    this.xAxisName = graph.xAxis;
    this.yAxisName = graph.yAxis;
    this.units = data.units;
    this.min = data.min;
    this.max = data.max;

    this.chartData = [new ChartData(this.title)];
  }

  addData(data: number): void {
    this.chartData[0].series.push(new DataPoint(Date.now(), data));

    if (this.chartData[0].series.length > 100) {
      this.chartData[0].series.shift();
    }

    this.chartData = [...this.chartData];
  }

}

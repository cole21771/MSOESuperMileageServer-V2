import {ChartData} from './ChartData';
import {DataPoint} from './DataPoint';

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
  displayAlways: boolean;
  showGraph: boolean;

  chartData: ChartData[];

  constructor(graphInfo) {
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
  }

  addData(data: number): void {
    if (this.showGraph) {
      this.chartData[0].series.push(new DataPoint(Date.now(), data));

      if (this.chartData[0].series.length > 100) {
        this.chartData[0].series.shift();
      }

      this.chartData = [...this.chartData];
    }
  }
}

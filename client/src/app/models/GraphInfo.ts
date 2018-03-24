import {ChartData} from './ChartData';
import {DataPoint} from './DataPoint';
import {IncomingData} from './interfaces/IncomingData';
import {Graph} from './interfaces/Graph';
import {isNull, isNullOrUndefined} from 'util';

export class GraphInfo {
  title: string;
  color: any = {
    domain: []
  };
  xLabel: string;
  yLabels: string[];
  xName: string;
  yName: string;
  units: string;
  min: number;
  max: number;
  chartData: ChartData[];

  constructor(xData: IncomingData, yData: IncomingData[], graph: Graph) {
    this.xLabel = graph.xAxis;
    this.yLabels = graph.yAxis.replace(' ', '').split(',');

    this.xName = this.xLabel.replace('_', ' ');
    this.yName = yData.map(data => data.label)
      .reduce((accumulator, currentLabel, index) =>
        accumulator.concat(index ? ' & ' : '', currentLabel), '')
      .replace(/_/g, ' ');

    this.title = `${this.yName} vs ${this.xName}`;

    this.color.domain = graph.colors;
    this.units = yData.map(data => data.units)
      .reduce((accumulator, currentUnits, index) => accumulator.concat(index ? ', ' : '', currentUnits), '');

    this.setMinAndMax(yData);

    this.chartData = yData.map(data => new ChartData(data.label));
  }

  private setMinAndMax(dataArray: IncomingData[]) {
    this.min = dataArray.reduce((chosenData, currentData) => {
      return currentData.min < chosenData.min ? currentData : chosenData;
    }).min;

    this.max = dataArray.reduce((chosenData, currentData) => {
      return currentData.max > chosenData.max ? currentData : chosenData;
    }).max;
  }

  addData(x: number, yArray: number[]) {
    yArray.forEach((y, index) => {
      this.chartData[index].series.push(new DataPoint(`${x}`, y));

      if (this.chartData[index].series.length > 100) {
        this.chartData[index].series.shift();
      }
    });

    this.chartData = [...this.chartData];
  }
}

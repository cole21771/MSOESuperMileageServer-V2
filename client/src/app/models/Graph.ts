import {ChartData} from './interfaces/ChartData';
import {IncomingData} from './interfaces/config/IncomingData';
import {GraphProperties} from './interfaces/config/GraphProperties';

export class Graph {
  color: any = {
    domain: []
  };
  xLabel: string;
  yLabel: string;
  yLabels: string[];
  xName: string;
  yName: string;
  min: number;
  max: number;
  chartData: ChartData[];

  constructor(yData: IncomingData[], graph: GraphProperties) {
    this.xLabel = graph.xAxis;
    this.yLabel = graph.yAxis;
    this.yLabels = graph.yAxis.replace(' ', '').split(',');

    this.xName = this.xLabel.replace('_', ' ');
    this.yName = yData.map(data => data.label)
      .reduce((accumulator, currentLabel, index) =>
        accumulator.concat(index ? ' & ' : '', currentLabel), '')
      .replace(/_/g, ' ');

    this.color.domain = graph.colors;
    this.setMinAndMax(yData);

    this.chartData = yData.map(data => {
      return {name: data.label, series: []};
    });
  }

  private setMinAndMax(dataArray: IncomingData[]) {
    this.min = dataArray.reduce((chosenData, currentData) => {
      return currentData.min < chosenData.min ? currentData : chosenData;
    }).min;

    this.max = dataArray.reduce((chosenData, currentData) => {
      return currentData.max > chosenData.max ? currentData : chosenData;
    }).max;
  }

  get getTitle(): string {
    return `${this.yName} vs ${this.xName}`;
  }

  addData(x: number, yArray: number[]) {
    yArray.forEach((y, index) => {
      this.chartData[index].series.push({name: `${x}`, value: y});

      if (this.chartData[index].series.length > 100) {
        this.chartData[index].series.shift();
      }
    });

    this.chartData = [...this.chartData];
  }
}

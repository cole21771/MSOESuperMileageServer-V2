import {ChartData} from './ChartData';
import {DataPoint} from './DataPoint';
import {IncomingData} from '../interfaces/IncomingData';
import {Graph} from '../interfaces/Graph';
import {isNullOrUndefined} from "util";

const FormulaParser = require('hot-formula-parser').Parser;

export class GraphInfo {
  title: string;
  color: any = {
    domain: []
  };
  xLabel: string;
  yLabel: string;
  xName: string;
  yName: string;
  units: String;
  min: number;
  max: number;
  chartData: ChartData[];

  xFormula: string;
  yFormula: string;

  constructor(xData: IncomingData, yData: IncomingData, graph: Graph) {
    this.xLabel = graph.xAxis;
    this.yLabel = graph.yAxis;

    this.xName = this.xLabel.replace('_', ' ');
    this.yName = this.yLabel.replace('_', ' ');
    this.title = `${this.yName} vs ${this.xName}`;

    this.color.domain.push(graph.color);
    this.units = xData.units;
    this.min = xData.min;
    this.max = xData.max;

    this.xFormula = xData.formula;
    this.yFormula = yData.formula;

    if (xData.formula) {

    }

    this.chartData = [new ChartData(this.title)];
  }

  addData(xDataMap: Map<string, number>, yDataMap: Map<string, number>): void { // TODO account for formula
    let x, y;

    if (this.xFormula) {

    } else {

    }



    this.chartData[0].series.push(new DataPoint(x, y));

    if (this.chartData[0].series.length > 100) {
      this.chartData[0].series.shift();
    }

    this.chartData = [...this.chartData];
  }

  get isValid(): boolean {
    return isNullOrUndefined(this.title) ||
      isNullOrUndefined(this.color.domain[0]) ||
      isNullOrUndefined(this.xName) ||
      isNullOrUndefined(this.yName) ||
      isNullOrUndefined(this.units) ||
      isNullOrUndefined(this.min) ||
      isNullOrUndefined(this.max) ||
      isNullOrUndefined(this.chartData);
  }
}

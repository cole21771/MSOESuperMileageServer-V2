class DataPoint {
  name: String = '';
  value: number;

  constructor(date: Date, value: number) {
    this.name += date.getHours() % 12 + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();
    this.value = value;
  }
}

class ChartData {
  name: String;
  series: DataPoint[];

  constructor(name: String) {
    this.name = name;
    this.series = [];
  }
}


export class Graph {
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

    this.chartData = [new ChartData(this.title)];
  }

  addData(data: number): void {
    this.chartData[0].series.push(new DataPoint(new Date(), data));

    if (this.chartData[0].series.length > 20) {
      this.chartData[0].series.shift();
    }

    this.chartData = [...this.chartData];
  }
}

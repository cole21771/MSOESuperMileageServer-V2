export class Graph {
  title: String;
  color: any = {
    domain: []
  };
  xAxisName: String;
  yAxisName: String;
  units: String;

  chartData: ChartData;

  constructor(title: String, color: String, xAxisName: String, yAxisName: String, units: String) {
    this.title = title;
    this.color.domain.push(color);
    this.xAxisName = xAxisName;
    this.yAxisName = yAxisName;
    this.units = units;

    this.chartData = new ChartData(this.title);
  }

  addData(data: number): void {
    console.log('Received!');
    this.chartData.series.push(new DataPoint(Date.now(), data));

    this.chartData.series = [...this.chartData.series];
  }

  /*private pushData(data) {
    this.chartData.series.push({
      name: new Date,
      value: data
    });

    return this.chartData;
  }*/
}

class ChartData {
  name: String;
  series: DataPoint[];

  constructor(name: String) {
    this.name = name;
    this.series = [];
  }
}

class DataPoint {
  name: number;
  value: number;

  constructor(name: number, value: number) {
    this.name = name;
    this.value = value;
  }
}

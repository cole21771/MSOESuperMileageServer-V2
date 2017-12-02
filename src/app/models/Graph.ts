export class Graph {
  title: String;
  color: any = {
    domain: []
  };
  xAxisName: String;
  yAxisName: String;
  units: String;

  chartData: any = {
    'name': this.title,
    'series': []
  };

  constructor(title: String, color: String, xAxisName: String, yAxisName: String, units: String) {
    this.title = title;
    this.color.domain.push(color);
    this.xAxisName = xAxisName;
    this.yAxisName = yAxisName;
    this.units = units;
  }

  addData(data): void {
    console.log(this.title, data);
    this.chartData = [...this.pushData(data)];

  }

  private pushData(data) {
    this.chartData.series.push({
      name: new Date,
      value: data
    });

    return this.chartData;
  }

  size(): number {
    return this.chartData.series.length;
  }
}

export class Graph {
  title: String;
  color: String;
  xAxisName: String;
  yAxisName: String;
  units: String;

  chartData: any = {
    "name": this.title,
    "series": []
  };

  constructor(title: String, color: String, xAxisName: String, yAxisName: String, units: String) {
    this.title = title;
    this.color = color;
    this.xAxisName = xAxisName;
    this.yAxisName = yAxisName;
    this.units = units;
  }

  addData(data: Number): void {
    this.chartData.series.push({
      name: new Date(),
      value: data
    });
  };

  size(): number {
    return this.chartData.series.length;
  }
}

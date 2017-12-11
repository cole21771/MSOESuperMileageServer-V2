class DataPoint {
  name: String;
  value: number;

  constructor(currentTime: number, value: number) {
    this.name = this.msToTime(currentTime);
    this.value = value;
  }

  private msToTime(ms): String {
    const milliseconds = ms % 1000;
    ms = (ms - milliseconds) / 1000;
    const seconds = ms % 60;
    ms = (ms - seconds) / 60;
    const minutes = ms % 60;

    return minutes + (seconds.toString().length === 1 ? ':0' : ':') + (seconds + milliseconds / 1000).toFixed(2);
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

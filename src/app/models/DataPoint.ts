export class DataPoint {
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

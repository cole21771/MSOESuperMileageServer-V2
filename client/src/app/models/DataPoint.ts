export class DataPoint {
  name: string;
  value: number;

  constructor(x: string, y: number) {
    this.name = x;
    this.value = y;
  }
}

import {IncomingData} from "../interfaces/IncomingData";

export class DataHolder {
  formula: string;
  private data: number[];

  constructor(private incomingData: IncomingData) {

  }

  addData(data: number): void {
    this.data.push(data);
  }

  setFormula(formula: string) {
    this.formula = formula;
  }

  getFormula(): string {
    return this.formula;
  }

  get label(): string {
    return this.incomingData.label;
  }

  get min(): number {
    return this.incomingData.min;
  }

  get max(): number {
    return this.incomingData.max;
  }

  get units(): string {
    return this.incomingData.units;
  }


}

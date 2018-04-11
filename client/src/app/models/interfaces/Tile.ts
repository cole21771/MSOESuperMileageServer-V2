export interface Tile<T> {
  name: string;
  sub?: string;
  icon?: string;
  cols: number;
  rows: number;
  type: string;
  data: T;
}

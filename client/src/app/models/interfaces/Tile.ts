export interface Tile<T> {
  name: string;
  sub?: string;
  icon?: string;
  columns: number;
  rows: number;
  type: string;
  data: T;
}

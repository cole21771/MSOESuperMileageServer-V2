export interface Tile {
  name: string;
  subName?: string;
  icon?: string;
  columns: number;
  rows: number;
  type: string;
  data: any;
}

import {Tile} from '../Tile';

export interface View {
  name: string;
  type: string;
  cols: number;
  tiles: Tile[];
}

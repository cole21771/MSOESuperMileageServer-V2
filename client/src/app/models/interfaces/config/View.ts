import {Tile} from '../Tile';

export interface View {
  name: string;
  cols: number;
  tiles: Tile[];
}

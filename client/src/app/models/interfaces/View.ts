import {Tile} from './Tile';

export interface View {
  name: string;
  tiles: Tile<any>[];
}

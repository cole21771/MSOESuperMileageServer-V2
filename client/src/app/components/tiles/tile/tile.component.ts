import {Component, Input} from '@angular/core';
import {Tile} from '../../../models/interfaces/Tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
})
export class TileComponent {
  @Input() tile: Tile;
}

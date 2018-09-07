import {Component, Input} from '@angular/core';
import {IconService} from '../../../services/icon/icon.service';

@Component({
  selector: 'app-tile-icon',
  templateUrl: './tile-icon.component.html',
  styleUrls: ['./tile-icon.component.scss']
})
export class TileIconComponent {
  @Input() icon: string;

  constructor(private iconService: IconService) {
  }

  get iconType(): string {
    return this.iconService.getIconType(this.icon);
  }
}

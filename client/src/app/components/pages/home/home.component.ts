import {Component, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {ConfigService} from '../../../services/config/config.service';
import {Tile} from '../../../models/interfaces/Tile';
import {View} from '../../../models/interfaces/View';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public tiles: Tile<any>[];

  constructor(private toolbarService: ToolbarService,
              private configService: ConfigService) {
  }

  get getTiles(): Tile<any>[] {
    return this.configService.getViews ? this.configService.getViews[0].tiles : [];
  }

  ngOnInit() {
    // Sets up listener for when the view changes
    this.toolbarService.viewChanged.subscribe((view: View) => {
      this.tiles = view.tiles;
      console.log(view);
    });
  }
}

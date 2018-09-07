import {Component, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {View} from '../../../models/interfaces/config/View';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public view: View;

  constructor(private toolbarService: ToolbarService) {
  }

  ngOnInit() {
    // Sets up listener for when the view changes
    this.toolbarService.viewChanged.subscribe((view: View) => {
      this.view = view;
    });

    this.toolbarService.emitLastView();
  }
}

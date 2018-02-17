import {Component, Input, OnInit} from '@angular/core';
import {ToolbarService} from '../../services/toolbar/toolbar.service';
import {ConfigService} from '../../services/config/config.service';
import {View} from '../../interfaces/View';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  public selectedView: View;

  constructor(private toolbarService: ToolbarService,
              private configService: ConfigService,
              private router: Router) {
  }

  ngOnInit() {
    this.toolbarService.viewChanged().subscribe((view: View) => {
      this.selectedView = view;
    });
  }

  get getViews(): View[] {
    return this.configService.getViews;
  }

  switchTheme() {
    this.toolbarService.switchTheme();
  }

  changeView(view: View) {
    this.selectedView = view;
    this.toolbarService.setView(view);
  }

  switchGraphMode() {
    this.toolbarService.switchGraphMode();
  }

  get isHome() {
    return this.router.url === '/';
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}

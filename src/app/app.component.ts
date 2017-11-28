import {Component} from '@angular/core';
import {ThemeService} from './services/theme/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuperMileage Server';
  themeService: ThemeService;
  isDarkTheme: Boolean = true;

  constructor(themeService: ThemeService) {
    this.themeService = themeService;
  }

  switchTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.setTheme(this.isDarkTheme ? 'dark-theme' : '');
  }
}

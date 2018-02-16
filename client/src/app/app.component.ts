import {Component, OnInit} from '@angular/core';
import {MatDialog, MatIconRegistry, MatSnackBar} from '@angular/material';
import {LoginComponent} from './components/login/login.component';
import {SocketIoService} from './services/socket-io/socket-io.service';
import {CommunicatorService} from './services/communicator/communicator.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {LoginData} from './interfaces/LoginData';
import {ConfigService} from "./services/config/config.service";
import {View} from "./interfaces/View";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'SuperMileage Server';

  public isDarkTheme: Boolean = true;
  public isLoggedIn: Boolean = false;
  public selectedView = {name: 'All', graphs: []};

  constructor(private socketService: SocketIoService,
              private communicator: CommunicatorService,
              private loginDialog: MatDialog,
              private snackBar: MatSnackBar,
              private registry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              public router: Router,
              public configService: ConfigService) {
  }

  ngOnInit() {
    this.registry.addSvgIcon('moon',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/moon.svg')); // TODO this still doesn't work
  }

  switchTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  openLogin() {
    const dialogRef = this.loginDialog.open(LoginComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((loginData: LoginData) => {
      if (!loginData) {
        return;
      }
      if (loginData.isValid) {
        this.socketService.attemptLogin(loginData)
          .then((loginSuccessful: boolean) => {
            if (loginSuccessful) {
              this.launchSnackBar('Login Successful!');
              this.isLoggedIn = true;
            } else {
              this.launchSnackBar('Invalid username or password!');
            }
          });
      } else {
        this.launchSnackBar('If you\'re going to try to hack this, at least try entering some text');
      }
    });
  }

  changeView(view: View) {
    this.selectedView = view;
    this.communicator.setGraphs(view.graphs);
  }

  logout() {
    this.socketService.logout();
    this.isLoggedIn = false;

    if (this.router.url === '/admin') {
      this.router.navigate(['']);
    }
  }

  switchGraphMode() {
    this.communicator.refreshUI();
  }

  get isHome() {
    return this.router.url === '/';
  }

  private launchSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000
    });
  }
}

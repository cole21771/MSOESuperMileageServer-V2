import {Component, OnInit} from '@angular/core';
import {MatDialog, MatIconRegistry, MatSnackBar} from '@angular/material';
import {LoginComponent} from './components/shared/login/login.component';
import {SocketIoService} from './services/socket-io/socket-io.service';
import {ToolbarService} from './services/toolbar/toolbar.service';
import {Router} from '@angular/router';
import {LoginData} from './models/interfaces/LoginData';
import {IconService} from './services/icon/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  viewProviders: [MatIconRegistry]
})
export class AppComponent implements OnInit{
  public isLoggedIn: Boolean = false;

  constructor(private router: Router,
              private socketService: SocketIoService,
              private toolbarService: ToolbarService,
              private iconService: IconService,
              private loginDialog: MatDialog,
              private snackBar: MatSnackBar,
              private registry: MatIconRegistry) {
  }

  ngOnInit() {
    this.iconService.init(this.registry);
  }

  openLogin() {
    const dialogRef = this.loginDialog.open(LoginComponent, {
      width: '260px',
      height: '270px'
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

  get isDarkTheme() {
    return this.toolbarService.isDarkTheme;
  }


  logout() {
    this.socketService.logout();
    this.isLoggedIn = false;

    if (this.router.url === '/admin') {
      this.router.navigate(['']);
    }
  }

  private launchSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000
    });
  }
}

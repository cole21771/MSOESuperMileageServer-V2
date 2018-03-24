import {Component, OnInit} from '@angular/core';
import {MatDialog, MatIconRegistry, MatSnackBar} from '@angular/material';
import {LoginComponent} from './components/shared/login/login.component';
import {SocketIoService} from './services/socket-io/socket-io.service';
import {ToolbarService} from './services/toolbar/toolbar.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {LoginData} from './models/interfaces/LoginData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [MatIconRegistry]
})
export class AppComponent implements OnInit {
  public isLoggedIn: Boolean = false;

  constructor(private router: Router,
              private socketService: SocketIoService,
              private toolbarService: ToolbarService,
              private loginDialog: MatDialog,
              private snackBar: MatSnackBar,
              private registry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.registry.addSvgIcon('moon',
      this.sanitizer.bypassSecurityTrustResourceUrl('./assets/moon.svg'));
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

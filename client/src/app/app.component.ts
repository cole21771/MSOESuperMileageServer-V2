import {Component} from '@angular/core';
import {MatDialog, MatIconRegistry, MatSnackBar} from '@angular/material';
import {LoginComponent} from './components/login/login.component';
import {SocketIoService} from './services/socket-io/socket-io.service';
import {CommunicatorService} from './services/communicator/communicator.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'SuperMileage Server';
  public router: Router;

  public isDarkTheme: Boolean = true;
  public isLoggedIn: Boolean = false;

  constructor(private socketService: SocketIoService, private communicator: CommunicatorService, private loginDialog: MatDialog,
              private snackBar: MatSnackBar, private registry: MatIconRegistry, router: Router, sanitizer: DomSanitizer) {
    this.router = router;

    registry.addSvgIcon('moon',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/moon.svg')); // TODO this still doesn't work
  }

  switchTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  openLogin() {
    const dialogRef = this.loginDialog.open(LoginComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((loginData) => {
      if (!loginData) {
        return;
      }
      if (loginData) {
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

  private launchSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000
    });
  }
}

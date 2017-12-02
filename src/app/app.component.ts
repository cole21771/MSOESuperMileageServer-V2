import {Component, Inject} from '@angular/core';
import {ThemeService} from './services/theme/theme.service';
import {MAT_SNACK_BAR_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {LoginComponent} from './components/login/login.component';
import {SocketIoService} from './services/socket-io/socket-io.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuperMileage Server';
  themeService: ThemeService;
  socketService: SocketIoService;

  isDarkTheme: Boolean = true;
  admin: Boolean = false;

  loginDialog: MatDialog;
  snackBar: MatSnackBar;

  constructor(themeService: ThemeService, socketService: SocketIoService, dialog: MatDialog, snackBar: MatSnackBar) {
    this.themeService = themeService;
    this.socketService = socketService;
    this.loginDialog = dialog;
    this.snackBar = snackBar;
  }

  switchTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.setTheme(this.isDarkTheme ? 'dark-theme' : '');
  }

  openLogin() {
    const dialogRef = this.loginDialog.open(LoginComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((login) => {
      if (!login) {
        return;
      }
      if (login.isValid) {
        this.socketService.attemptLogin(login)
          .then((isAdmin: boolean) => {
            if (isAdmin) {
              this.launchSnackBar('Login Successful!');
              this.admin = true;
            } else {
              this.launchSnackBar('Invalid username or password!');
            }
          });
      } else {
        this.launchSnackBar('If you\'re going to try to hack this, at least try entering some text');
      }
    });
  }

  private launchSnackBar(message: String) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      duration: 1500
    });
  }
}

@Component({
  selector: 'app-snack-bar',
  template: '<span class="snackBar">{{data}}</span>',
  styles: ['.snackBar { color: hotpink }']
})
export class SnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }
}

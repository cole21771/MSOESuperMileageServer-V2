import {Component} from '@angular/core';
import {MatDialog, MatIconRegistry, MatSnackBar} from '@angular/material';
import {LoginComponent} from './components/login/login.component';
import {SocketIoService} from './services/socket-io/socket-io.service';
import {CommunicatorService} from './services/communicator/communicator.service';
import {SnackBarComponent} from './components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuperMileage Server';
  socketService: SocketIoService;
  communicator: CommunicatorService;

  isDarkTheme: Boolean = true;
  admin: Boolean = false;

  loginDialog: MatDialog;
  snackBar: MatSnackBar;

  constructor(socketService: SocketIoService, communicator: CommunicatorService, dialog: MatDialog,
              snackBar: MatSnackBar, registry: MatIconRegistry) {
    this.socketService = socketService;
    this.communicator = communicator;
    this.loginDialog = dialog;
    this.snackBar = snackBar;

    registry.addSvgIcon('moon', 'assets/moon.svg');
  }

  switchTheme() {
    this.isDarkTheme = !this.isDarkTheme;
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

import {Component} from '@angular/core';
import {SocketIoService} from '../../services/socket-io/socket-io.service';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private socketService: SocketIoService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  record() {
    this.socketService.record().then((successful) => {
      if (successful) {
        this.snackBar.open('Started Recording!', undefined, {duration: 2000});
      } else {
        this.snackBar.open('There was a problem starting the recording!', undefined, {duration: 2000});
      }
    });
  }

  stop(filename: string) {
    this.socketService.stop(filename).then((err) => {
      if (!err) {
        this.snackBar.open('File saved as ' + filename, undefined, {duration: 2000});
      } else {
        this.snackBar.open('File not saved!', undefined, {duration: 2000});
      }
    });
  }

}

import { Injectable } from '@angular/core';
import {FileInfo} from '../../models/interfaces/FileInfo';
import {SocketIoService} from '../socket-io/socket-io.service';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class LogService {

  constructor(private socketService: SocketIoService,
              private snackBar: MatSnackBar) { }


  downloadFile(fileInfo: FileInfo): void {
    this.socketService.getFile(fileInfo).then((response) => {
      if (response.error) {
        this.showSnackBar(response.errorMessage);
        return;
      }

      this.download(response.data, fileInfo.filename);
      this.showSnackBar('File downloaded');
    });
  }

  private download(data: string, filename: string): void {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,'
      + encodeURIComponent(data));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, undefined, {duration: 3000});
  }
}

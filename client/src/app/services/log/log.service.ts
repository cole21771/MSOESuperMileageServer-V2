import {Injectable} from '@angular/core';
import {FileInfo} from '../../models/interfaces/FileInfo';
import {SocketIoService} from '../socket-io/socket-io.service';
import {MatSnackBar} from '@angular/material';
import {Response} from '../../models/interfaces/Response';

@Injectable()
export class LogService {

  constructor(private socketService: SocketIoService,
              private snackBar: MatSnackBar) {
  }

  downloadFile(fileInfo: FileInfo): void {
    this.socketService.getFile(fileInfo).then((res) =>
      this.handleFileResponse(res, fileInfo));
  }

  downloadCSVFile(fileInfo: FileInfo) {
    this.socketService.getFile(fileInfo, true).then((res) => {
      fileInfo.filename = fileInfo.filename.substring(0, fileInfo.filename.length - 3) + '.csv';
      this.handleFileResponse(res, fileInfo);
    });
  }

  private handleFileResponse(response: Response<string>, fileInfo: FileInfo) {
    if (response.error) {
      this.showSnackBar(response.errorMessage);
      return;
    }

    this.download(response.data, fileInfo.filename);
    this.showSnackBar('File downloaded');
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

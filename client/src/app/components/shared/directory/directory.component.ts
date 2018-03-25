import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {SocketIoService} from '../../../services/socket-io/socket-io.service';
import {FileInfo} from '../../../models/interfaces/FileInfo';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<string>;
  public displayedColumns = ['filename'];

  constructor(private socketService: SocketIoService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  fetchFile(fileInfo: FileInfo): void {
    this.showSnackBar('Fetching file');
    this.socketService.getFile(fileInfo).then((response) => {
      if (response.error) {
        this.snackBar.open(response.errorMessage, undefined, {duration: 3000});
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

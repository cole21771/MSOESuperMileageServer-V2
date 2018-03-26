import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {SocketIoService} from '../../../services/socket-io/socket-io.service';
import {FileInfo} from '../../../models/interfaces/FileInfo';
import {LogService} from '../../../services/log/log.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent {
  @Input() dataSource: MatTableDataSource<string>;
  public displayedColumns = ['filename'];

  constructor(private logService: LogService) {
  }

  downloadFile(fileInfo: FileInfo) {
    this.logService.downloadFile(fileInfo);
  }
}

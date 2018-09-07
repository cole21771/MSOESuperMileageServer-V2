import {Component, Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {FileInfo} from '../../../models/interfaces/FileInfo';
import {LogService} from '../../../services/log/log.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent {
  @Input() dataSource: MatTableDataSource<string>;
  public displayedColumns = ['filename', 'actions'];

  constructor(private logService: LogService) {
  }

  getSMV(fileInfo: FileInfo) {
    this.logService.downloadFile(fileInfo);
  }

  getCSV(fileInfo: FileInfo) {
    this.logService.downloadCSVFile(fileInfo);
  }
}

import { Component, OnInit } from '@angular/core';
import {SocketIoService} from '../../../services/socket-io/socket-io.service';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {Response} from '../../../models/interfaces/Response';
import {FileInfo} from '../../../models/interfaces/FileInfo';

@Component({
  selector: 'app-review-data',
  templateUrl: './review-data.component.html',
  styleUrls: ['./review-data.component.css']
})
export class ReviewDataComponent implements OnInit {
  dataSource = new MatTableDataSource();

  constructor(private socketService: SocketIoService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  viewLogs(): void {
    this.socketService.getLogs().then(this.handleResponse.bind(this));
  }

  viewRecordings(): void {
    this.socketService.getRecordings().then(this.handleResponse.bind(this));
  }

  private handleResponse(response: Response<FileInfo[]>) {
    if (response.error) {
      this.showSnackBar(response.errorMessage);
      return;
    }
    this.showSnackBar('Data successfully retrieved!');
    this.dataSource.data = response.data;
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, undefined, {duration: 3000});
  }

}

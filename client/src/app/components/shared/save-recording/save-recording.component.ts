import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {SocketIoService} from '../../../services/socket-io/socket-io.service';

@Component({
  templateUrl: './save-recording.component.html'
})
export class SaveRecordingComponent implements OnInit {
  filenameForm: FormGroup;

  constructor(private socketService: SocketIoService,
              private dialogRef: MatDialogRef<SaveRecordingComponent>) {
  }

  ngOnInit() {
    this.filenameForm = new FormGroup({
      filename: new FormControl(),
    });

    this.filenameForm.controls.filename.patchValue(this.getDefaultFilename());
  }

  getDefaultFilename(): string {
    const date = new Date();
    const time = date.toTimeString()
      .replace(/G.*$/, '')      // Gets rid of crap on the end
      .replace(' ', '')         // Gets rid of extra space left by previous replace
      .replace(/:/g, '-');      // Replaces colons with dashes

    return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}, ${time}.csv`;
  }

  async save() {
    const filename = this.filenameForm.controls.filename.value;
    console.log(filename);
    if (!await this.socketService.doesFileExist(filename)) {
      this.dialogRef.close(filename);
    } else {
      console.log('File already exists!');
    }
  }

}

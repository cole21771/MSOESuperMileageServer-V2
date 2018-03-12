import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  templateUrl: './save-recording.component.html'
})
export class SaveRecordingComponent implements OnInit {

  filenameForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.filenameForm = new FormGroup({
      filename: new FormControl(),
    });
  }

  get getCurrentDate(): string {
    return new Date().toString().replace(/:/g, '-');
  }

}

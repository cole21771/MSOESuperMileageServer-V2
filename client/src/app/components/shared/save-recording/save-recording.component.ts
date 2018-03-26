import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {SocketIoService} from '../../../services/socket-io/socket-io.service';

@Component({
  templateUrl: './save-recording.component.html'
})
export class SaveRecordingComponent implements OnInit {
  form: FormGroup;

  constructor(private socketService: SocketIoService,
              private dialogRef: MatDialogRef<SaveRecordingComponent>,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      filename: new FormControl(this.getDefaultFilename(),
        [
          Validators.required,
          this.invalidCharactersValidator()
        ]),
    });

    this.form.controls.filename.patchValue(this.getDefaultFilename());
  }

  private invalidCharactersValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const forbidden = /[:/\\*?<>|"]/g.test(control.value);
      return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
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
    const filename = this.form.controls.filename.value;
    if (!await this.socketService.doesRecordingExist(filename)) {
      this.dialogRef.close(filename);
    } else {
      // this.dialogRef.close({error: true, data: ''});
      this.snackBar.open('Filename already in use!', undefined, {duration: 3000});
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}

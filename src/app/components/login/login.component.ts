import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: Boolean = true;
  loginForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginComponent>) {
    // dialogRef is the dialog box object
  }

  login(event?) {
    if (event) {
      if (event.keyCode !== 13) { // Enter key
        return;
      }
    }

    if (!this.loginForm.value.username || !this.loginForm.value.password) {
      this.dialogRef.close({
        error: true
      });
      return;
    }

    this.dialogRef.close({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

}

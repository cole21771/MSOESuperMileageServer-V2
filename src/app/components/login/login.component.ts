import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  hide: Boolean = true;
  loginForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginComponent>) {
    // dialogRef is the dialog box object
  }

  login() {
    if (!this.loginForm.value.username || !this.loginForm.value.password) {
      this.dialogRef.close({
        isValid: false
      });
      return;
    }

    this.dialogRef.close({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      isValid: true
    });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

}

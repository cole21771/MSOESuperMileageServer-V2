import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {Component, Inject} from '@angular/core';

@Component({
  selector: 'app-snack-bar',
  template: '<span class="snackBar">{{data}}</span>',
  styles: ['.snackBar { color: hotpink }']
})
export class SnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }
}

import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule,
  MatToolbarModule, MatSnackBarModule, MatGridListModule, MatExpansionModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule
  ]
})
export class AppMaterialModule {
}

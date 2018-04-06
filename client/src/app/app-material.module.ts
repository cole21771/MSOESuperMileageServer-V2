import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule,
  MatToolbarModule, MatSnackBarModule, MatGridListModule, MatTooltipModule, MatMenuModule, MatTableModule
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
    MatCardModule,
    MatGridListModule,
    MatTooltipModule,
    MatMenuModule,
    MatTableModule
  ]
})
export class AppMaterialModule {
}

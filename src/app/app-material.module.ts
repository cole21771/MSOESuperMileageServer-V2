import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule
  ]
})
export class AppMaterialModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ReviewDataComponent} from './components/review-data/review-data.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'review-data', component: ReviewDataComponent},
  {path: 'admin', component: HomeComponent} // TODO: Change this later!
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}

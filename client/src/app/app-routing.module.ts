import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuard} from './gaurds/admin/admin.guard';
import {HomeComponent} from './components/pages/home/home.component';
import {ReviewDataComponent} from './components/pages/review-data/review-data.component';
import {AdminComponent} from './components/pages/admin/admin.component';
import {CalculatorComponent} from './components/pages/calculator/calculator.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'review-data', component: ReviewDataComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'calculator', component: CalculatorComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

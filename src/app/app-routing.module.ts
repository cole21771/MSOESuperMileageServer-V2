import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ReviewDataComponent} from './components/review-data/review-data.component';
import {AdminComponent} from './components/admin/admin.component';
import {CalculatorComponent} from "./components/calculator/calculator.component";
import {AdminGuard} from "./gaurds/admin/admin.guard";

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

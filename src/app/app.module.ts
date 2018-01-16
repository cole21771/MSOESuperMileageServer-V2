import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocketIoService} from './services/socket-io/socket-io.service';

import {AppComponent} from './app.component';
import {GraphComponent} from './components/graph/graph.component';

import {ReviewDataComponent} from './components/review-data/review-data.component';
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {AppMaterialModule} from './app-material.module';
import {LoginComponent} from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LineChartModule} from '@swimlane/ngx-charts';
import {CommunicatorService} from './services/communicator/communicator.service';
import {SnackBarComponent} from './components/snack-bar/snack-bar.component';
import {AdminComponent} from './components/admin/admin.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import {AdminGuard} from './gaurds/admin/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ReviewDataComponent,
    HomeComponent,
    LoginComponent,
    SnackBarComponent,
    AdminComponent,
    CalculatorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LineChartModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [SocketIoService, CommunicatorService, AdminGuard],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SnackBarComponent]
})
export class AppModule {
}

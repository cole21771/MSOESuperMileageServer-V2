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
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LineChartModule} from '@swimlane/ngx-charts';
import {CommunicatorService} from './services/communicator/communicator.service';
import {SnackBarComponent} from './components/snack-bar/snack-bar.component';
import {MatIconRegistry} from "@angular/material";
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ReviewDataComponent,
    HomeComponent,
    LoginComponent,
    SnackBarComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LineChartModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [SocketIoService, CommunicatorService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SnackBarComponent]
})
export class AppModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocketIoService} from './services/socket-io/socket-io.service';

import {AppComponent} from './app.component';
import {GraphComponent} from './components/shared/graph/graph.component';

import {AppRoutingModule} from './app-routing.module';
import {AppMaterialModule} from './app-material.module';
import {LoginComponent} from './components/shared/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LineChartModule} from '@swimlane/ngx-charts';
import {ToolbarService} from './services/toolbar/toolbar.service';
import {AdminGuard} from './gaurds/admin/admin.guard';
import {ConfigService} from './services/config/config.service';
import {DataService} from './services/data/data.service';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { SaveRecordingComponent } from './components/shared/save-recording/save-recording.component';
import {ReviewDataComponent} from './components/pages/review-data/review-data.component';
import {HomeComponent} from './components/pages/home/home.component';
import {AdminComponent} from './components/pages/admin/admin.component';
import {CalculatorComponent} from './components/pages/calculator/calculator.component';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ReviewDataComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    CalculatorComponent,
    ToolbarComponent,
    SaveRecordingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LineChartModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [SocketIoService, ToolbarService, AdminGuard, ConfigService, DataService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SaveRecordingComponent]
})
export class AppModule {
}

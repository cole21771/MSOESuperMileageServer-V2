import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocketIoService} from './services/socket-io/socket-io.service';

import {AppComponent, SnackBarComponent} from './app.component';
import {GraphComponent} from './components/graph/graph.component';

import {ReviewDataComponent} from './components/review-data/review-data.component';
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeService} from './services/theme/theme.service';
import {AppMaterialModule} from './app-material.module';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LineChartModule} from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ReviewDataComponent,
    HomeComponent,
    LoginComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LineChartModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [SocketIoService, ThemeService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SnackBarComponent]
})
export class AppModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocketIoService} from './services/socket-io/socket-io.service';
import {NvD3Module} from 'ng2-nvd3';

import {AppComponent} from './app.component';
import {GraphComponent} from './components/graph/graph.component';

import 'd3';
import 'nvd3';
import { ReviewDataComponent } from './components/review-data/review-data.component';
import { HomeComponent } from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeService} from './services/theme/theme.service';
import {AppMaterialModule} from './app-material.module';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ReviewDataComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NvD3Module,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [SocketIoService, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

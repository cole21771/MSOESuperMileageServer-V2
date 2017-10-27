import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatCardModule, MatSidenavModule, MatToolbarModule} from "@angular/material";
import {AppSocketIoService} from "./services/socket-io.service";
import {NvD3Module} from "ng2-nvd3";

import {AppComponent} from './app.component';
import {GraphComponent} from './components/graph/graph.component';

import 'd3';
import 'nvd3';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NvD3Module,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [AppSocketIoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

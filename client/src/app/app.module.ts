import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocketIoService} from './services/socket-io/socket-io.service';

import {AppComponent} from './app.component';
import {GraphComponent} from './components/tiles/graph/graph.component';

import {AppRoutingModule} from './app-routing.module';
import {AppMaterialModule} from './app-material.module';
import {LoginComponent} from './components/shared/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LineChartModule, NgxChartsModule, NumberCardModule} from '@swimlane/ngx-charts';
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
import { DirectoryComponent } from './components/shared/directory/directory.component';
import {LogService} from './services/log/log.service';
import { NumberComponent } from './components/tiles/number/number.component';
import { TileIconComponent } from './components/tiles/tile-icon/tile-icon.component';
import { IconService } from './services/icon/icon.service';
import { TileComponent } from './components/tiles/tile/tile.component';
import { MapComponent } from './components/tiles/map/map.component';
import {AgmCoreModule} from '@agm/core';
import { MultiGraphComponent } from './components/tiles/multi-graph/multi-graph.component';

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
    SaveRecordingComponent,
    DirectoryComponent,
    NumberComponent,
    TileIconComponent,
    TileComponent,
    MapComponent,
    MultiGraphComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LineChartModule,
    NgxChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    AppMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDTI33G7NT8BwXOSEDuiOEZDD4s7Y63Uqo'
    })
  ],
  providers: [
    SocketIoService,
    ToolbarService,
    AdminGuard,
    ConfigService,
    DataService,
    LogService,
    IconService
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SaveRecordingComponent]
})
export class AppModule {
}

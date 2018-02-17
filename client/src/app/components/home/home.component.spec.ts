import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {SocketIoService} from '../../services/socket-io/socket-io.service';
import {GraphComponent} from '../graph/graph.component';
import 'd3';
import {ToolbarService} from '../../services/toolbar/toolbar.service';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {AppMaterialModule} from '../../app-material.module';
import {ConfigService} from '../../services/config/config.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        GraphComponent
      ],
      imports: [
        AppMaterialModule,
        NgxChartsModule
      ],
      providers: [
        ToolbarService,
        SocketIoService,
        ConfigService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GraphComponent} from './graph.component';
import 'd3';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataService} from '../../services/data/data.service';
import {SocketIoService} from '../../services/socket-io/socket-io.service';
import {ConfigService} from '../../services/config/config.service';
import {EventEmitter} from '@angular/core';
import {ChartData} from '../../models/ChartData';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

const dataServiceStub = {
  getLatestData: () => {},
  dataNotifier: new EventEmitter()
};
const configServiceStub = {};

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphComponent],
      imports: [
        NoopAnimationsModule,
        NgxChartsModule
      ],
      providers: [
        {provide: DataService, useValue: dataServiceStub},
        {provide: ConfigService, useValue: configServiceStub},
        SocketIoService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    component.graphInfo = {
      title: '',
      color: {domain: []},
      xLabel: '',
      yLabels: [''],
      xName: '',
      yName: '',
      units: '',
      min: 0,
      max: 0,
      chartData: [new ChartData('')],
      addData: () => {},
      isValid: true,
      setMinAndMax: () => {} // TODO not private?
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

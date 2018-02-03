import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {SocketIoService} from '../../services/socket-io/socket-io.service';
import {GraphComponent} from '../graph/graph.component';
import 'd3';
import {CommunicatorService} from '../../services/communicator/communicator.service';
import {MatCardModule, MatGridListModule} from '@angular/material';
import {NgxChartsModule} from '@swimlane/ngx-charts';

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
        MatGridListModule,
        MatCardModule,
        NgxChartsModule
      ],
      providers: [
        CommunicatorService,
        SocketIoService
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

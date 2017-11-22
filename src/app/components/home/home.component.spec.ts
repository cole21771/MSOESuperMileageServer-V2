import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {ThemeService} from '../../services/theme/theme.service';
import {SocketIoService} from '../../services/socket-io/socket-io.service';
import {GraphComponent} from '../graph/graph.component';
import 'd3';
import 'nvd3';
import {NvD3Module} from 'ng2-nvd3';

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
        NvD3Module
      ],
      providers: [
        ThemeService,
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

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {ToolbarService} from './services/toolbar/toolbar.service';
import {SocketIoService} from './services/socket-io/socket-io.service';
import {AppMaterialModule} from './app-material.module';
import {ToolbarComponent} from './components/shared/toolbar/toolbar.component';
import {ConfigService} from './services/config/config.service';

const toolbarServiceStub = {};
const socketIoServiceStub = {};
const configServiceStub = {};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ToolbarComponent
      ],
      imports: [
        AppMaterialModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: ToolbarService, useValue: toolbarServiceStub },
        {provide: SocketIoService, useValue: socketIoServiceStub},
        {provide: ConfigService, useValue: configServiceStub}
      ]
    }).compileComponents();
  }));
  it('should create the app', (() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

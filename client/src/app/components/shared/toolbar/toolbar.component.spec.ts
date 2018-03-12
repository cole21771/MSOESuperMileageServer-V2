import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import {AppMaterialModule} from '../../../app-material.module';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {ConfigService} from '../../../services/config/config.service';
import {RouterTestingModule} from '@angular/router/testing';
import {SocketIoService} from '../../../services/socket-io/socket-io.service';

const toolbarServiceStub = {
  viewChanged: () => {}
};
const configServiceStub = {};
const socketServiceStub = {};

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent
      ],
      imports: [
        AppMaterialModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ToolbarService, useValue: toolbarServiceStub},
        {provide: ConfigService, useValue: configServiceStub},
        {provide: SocketIoService, useValue: socketServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

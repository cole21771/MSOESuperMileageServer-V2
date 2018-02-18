import { TestBed, inject } from '@angular/core/testing';

import { ConfigService } from './config.service';
import {SocketIoService} from '../socket-io/socket-io.service';

const socketIoServiceStub = {};
const configServiceStub = {};

describe('ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ConfigService, useValue: configServiceStub},
        {provide: SocketIoService, useValue: socketIoServiceStub}
      ]
    });
  });

  it('should be created', inject([ConfigService], (service: ConfigService) => {
    expect(service).toBeTruthy();
  }));
});

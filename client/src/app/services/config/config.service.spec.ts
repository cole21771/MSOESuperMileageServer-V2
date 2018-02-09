import { TestBed, inject } from '@angular/core/testing';

import { ConfigService } from './config.service';
import {SocketIoService} from '../socket-io/socket-io.service';

describe('ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService, SocketIoService]
    });
  });

  it('should be created', inject([ConfigService], (service: ConfigService) => {
    expect(service).toBeTruthy();
  }));
});

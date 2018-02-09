import {TestBed, inject} from '@angular/core/testing';

import {DataService} from './data.service';
import {ConfigService} from '../config/config.service';
import {SocketIoService} from '../socket-io/socket-io.service';

const configServiceStub = {
  getModels: []
};

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: ConfigService, useValue: configServiceStub},
        SocketIoService
      ]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});

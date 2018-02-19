import {TestBed, inject} from '@angular/core/testing';

import {SocketIoService} from './socket-io.service';
import {LoginData} from '../../interfaces/LoginData';

const socketIoServiceStub = {
  attemptLogin: (loginData: LoginData) => {}
};

describe('SocketIoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: SocketIoService, useValue: socketIoServiceStub}
      ]
    });
  });

  it('should be created', inject([SocketIoService], (service: SocketIoService) => {
    expect(service).toBeTruthy();
  }));

  it('login should login', inject([SocketIoService], (socketService: SocketIoService) => {
    const loginData: LoginData = {
      username: 'username',
      password: 'password',
      isValid: true
    };

    spyOn(socketService, 'attemptLogin').and.returnValue(Promise.resolve(true));

    socketService.attemptLogin(loginData).then(loginStatus => {
      expect(loginStatus).toBeTruthy();
    });
  }));
});

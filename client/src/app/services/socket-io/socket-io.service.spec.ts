import {TestBed, inject} from '@angular/core/testing';

import {SocketIoService} from './socket-io.service';
import {LoginData} from '../../models/interfaces/LoginData';

describe('SocketIoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SocketIoService
      ]
    });
  });

  it('should be created', inject([SocketIoService], socketService => {
    expect(socketService).toBeTruthy();
  }));

  it('login should login', inject([SocketIoService], socketService => {
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

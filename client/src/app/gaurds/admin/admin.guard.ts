import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {SocketIoService} from '../../services/socket-io/socket-io.service';

@Injectable()
export class AdminGuard implements CanActivate {

  socketService: SocketIoService;

  constructor(socketService: SocketIoService) {
    this.socketService = socketService;
  }

  canActivate() {
    return this.socketService.isLoggedIn();
  }
}

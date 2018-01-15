import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SocketIoService} from "../../services/socket-io/socket-io.service";

@Injectable()
export class AdminGuard implements CanActivate {

  socketService: SocketIoService;

  constructor(socketService: SocketIoService, private router: Router) {
    this.socketService = socketService;
  }

  canActivate() {
    return this.socketService.isLoggedIn();
  }
}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketIoService {
  public socket: SocketIOClient.Socket; // The client instance of socket.io
  constructor() {
    this.socket = io();
  }






}

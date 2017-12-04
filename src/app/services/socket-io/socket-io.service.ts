import {EventEmitter, Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketIoService {
  private socket: SocketIOClient.Socket; // The client instance of socket.io

  private newDataEmitter: EventEmitter<any> = new EventEmitter<any>();
  private newLocationEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.socket = io();

    this.socket.emit('getVehicles');

    let lastTime = 0;
    setInterval(() => {
      const time = Date.now();
      this.socket.emit('test', time - lastTime);
      lastTime = time;
    }, 100);
  }

  getIncomingDataFormat() {
    return new Promise(resolve => {
      this.socket.emit('getIncomingDataFormat', undefined, (dataFormat) => {
        resolve(dataFormat);
      });
    });
  }

  getData(): EventEmitter<any> {
    this.socket.on('newData', (data) => {
      this.newDataEmitter.emit(data);
    });

    return this.newDataEmitter;
  }

  getLocation(): EventEmitter<any> {
    this.socket.on('newLocation', (location) => {
      this.newLocationEmitter.emit(location);
    });

    return this.newLocationEmitter;
  }

  attemptLogin(data): Promise<boolean> {
    return new Promise(resolve => {
      this.socket.emit('attemptLogin', data, (isAdmin) => {
        resolve(isAdmin);
      });
    });
  }
}

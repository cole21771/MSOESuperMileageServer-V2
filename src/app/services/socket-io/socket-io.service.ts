import {EventEmitter, Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketIoService {
  private socket: SocketIOClient.Socket; // The client instance of socket.io

  private newDataEmitter: EventEmitter<any> = new EventEmitter<any>();
  private newLocationEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.socket = io();

    setTimeout(() => {
      let lastPerformance = 0;
      setInterval(() => {
        const currentPerformance = performance.now();

        if (currentPerformance - lastPerformance > 920 && this.socket.connected) {
          this.disconnect();
        } else if (currentPerformance - lastPerformance < 920 && !this.socket.connected) {
          this.reconnect();
        }
        lastPerformance = currentPerformance;
      }, 700);
    }, 5000);
  }

  disconnect() {
    this.socket.disconnect();
  }

  reconnect() {
    this.socket.connect();
  }

  getSelectedConfig() {
    return new Promise(resolve => {
      this.socket.emit('getSelectedConfig', undefined, (dataFormat) => {
        resolve(dataFormat);
      });
    });
  }

  getData(): EventEmitter<any> {
    this.socket.on('newData', (data) => {
      this.newDataEmitter.emit(JSON.parse(data));
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
      this.socket.emit('attemptLogin', data, (loginSuccessful) => {
        resolve(loginSuccessful);
      });
    });
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise(resolve => {
      this.socket.emit('isLoggedIn', undefined, (isLoggedIn) => {
        resolve(isLoggedIn);
      });
    });
  }

  logout(): void {
    this.socket.emit('logout');
  }
}

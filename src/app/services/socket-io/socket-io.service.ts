import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketIoService {
  private socket: SocketIOClient.Socket; // The client instance of socket.io

  constructor() {
    this.socket = io();

    this.socket.emit('getVehicles');
  }

  getIncomingDataFormat() {
    return new Promise((resolve, reject) => {
      this.socket.emit('getIncomingDataFormat', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });

  }

  sendData(data: any) {
    this.socket.emit('newData', data);
  }

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit('newData', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  getLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit('newLocation', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  attemptLogin(data) {
    this.socket.emit('attemptLogin', data);
    return new Promise((resolve, reject) => {
      this.socket.emit('loginResponse', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}

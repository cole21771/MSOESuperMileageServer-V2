import {EventEmitter, Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketIoService {
  private socket: SocketIOClient.Socket; // The client instance of socket.io
  private promiseSocket: SocketIOClient.Socket; // The client instance of the promise version of socket.io

  private newDataEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.socket = io('/');
    this.promiseSocket = io('/promise');

    this.socket.emit('getVehicles');
  }

  getIncomingDataFormat() {
    return new Promise((resolve, reject) => {
      this.promiseSocket.emit('getIncomingDataFormat', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });

  }

  sendData(data: any) {
    this.socket.emit('newData', data);
    console.log('send');
  }

  getData(): EventEmitter<any> {
    /*return new Promise((resolve, reject) => {
      this.promiseSocket.emit('newData', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });*/
    this.socket.on('newData', (data) => {
      this.newDataEmitter.emit(data);
      console.log(data);
    });

    return this.newDataEmitter;
  }

  getLocation() {
    /*return new Promise((resolve, reject) => {
      this.socket.emit('newLocation', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });*/
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

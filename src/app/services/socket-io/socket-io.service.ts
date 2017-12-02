import {EventEmitter, Injectable, Output} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketIoService {
  private socket: SocketIOClient.Socket; // The client instance of socket.io
  @Output() private newDataEmitter: EventEmitter<any> = new EventEmitter();
  @Output() private newLocationEmitter: EventEmitter<any> = new EventEmitter();
  @Output() private userDataEmitter: EventEmitter<any> = new EventEmitter();
  @Output() private dataFormatEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.socket = io();

    this.socket.on('newData', (data) => {
      this.newDataEmitter.emit(data);
    });

    this.socket.on('newLocation', (locationData) => {
      this.newLocationEmitter.emit(locationData);
    });

    this.socket.on('loginResponse', (userData) => {
      this.userDataEmitter.emit(userData);
    });

    this.socket.on('incomingDataFormat', (dataFormat) => {
      this.dataFormatEmitter.emit(dataFormat);
    });
  }

  getIncomingDataFormat() {
    this.socket.emit('getIncomingDataFormat');
    return this.dataFormatEmitter;
  }

  sendData(data: any) {
    this.socket.emit('newData', data);
  }

  getData() {
    return this.newDataEmitter;
  }

  getLocation() {
    return this.newLocationEmitter;
  }

  attemptLogin(data): EventEmitter<any> {
    this.socket.emit('attemptLogin', data);
    return this.userDataEmitter;
  }


}

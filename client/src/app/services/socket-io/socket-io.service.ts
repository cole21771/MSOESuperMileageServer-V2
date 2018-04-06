import {EventEmitter, Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Config} from '../../models/interfaces/Config';
import {LoginData} from '../../models/interfaces/LoginData';
import {Response} from '../../models/interfaces/Response';
import {FileInfo} from '../../models/interfaces/FileInfo';
import Socket = SocketIOClient.Socket;

@Injectable()
export class SocketIoService {
  private socket: Socket; // The client instance of socket.io

  private newDataEmitter: EventEmitter<any> = new EventEmitter<any>();
  private newLocationEmitter: EventEmitter<any> = new EventEmitter<any>();
  private uuid: string;

  constructor() {
    this.socket = io();
    this.setupPerformanceMonitor();
    this.uuid = this.createUUID();

    window.onbeforeunload = () => {
      this.socket.emit('client-disconnect', this.uuid);
    };
  }

  /**
   * Uses the Visibility API to disconnect from the server when the tab is no longer visible
   */
  private setupPerformanceMonitor() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.disconnect();
      } else {
        this.reconnect();
      }
    });
  }

  /**
   * Disconnects from the server
   */
  private disconnect() {
    this.socket.disconnect();
  }

  /**
   * Reconnects to the server
   */
  private reconnect() {
    this.socket.connect();
  }

  /**
   * Sends a request to the server to get the selected configuration.
   *
   * @returns {Promise<Config>} a Promise holding the Config file.
   */
  getSelectedConfig(): Promise<Response<Config>> {
    return new Promise(resolve => {
      this.socket.emit('getSelectedConfig', undefined, (dataFormat) => {
        resolve(dataFormat);
      });
    });
  }

  /**
   * Sets up a listener for newData and returns the newDataEmitter so that the DataService
   * can subscribe to new data notifications.
   *
   * @returns {EventEmitter<number[]>} the new data event emitter
   */
  getNewDataEmitter(): EventEmitter<number[]> {
    this.socket.on('newData', (data) => {
      this.newDataEmitter.emit(JSON.parse(data));
    });

    return this.newDataEmitter;
  }

  /**
   * Sets up a listener for newLocation and returns the newLocationEmitter so that the LocationService
   * can subscribe to new location notifications.
   *
   * @returns {EventEmitter<any>} the new location event emitter
   */
  getLocation(): EventEmitter<any> {
    this.socket.on('newLocation', (location) => {
      this.newLocationEmitter.emit(location);
    });

    return this.newLocationEmitter;
  }

  /**
   * Makes a login attempt with the provided LoginData
   *
   * @param data the loginData sent to the server
   * @returns {Promise<boolean>} a promise holding the a boolean that says whether or not the login was error
   */
  attemptLogin(data: LoginData): Promise<boolean> {
    return new Promise(resolve => {
      data.uuid = this.uuid;

      this.socket.emit('attemptLogin', data, (loginSuccessful) => {
        resolve(loginSuccessful);
      });
    });
  }

  /**
   * Makes a request to the server to check whether or not this socket is logged into the system
   *
   * @returns {Promise<boolean>} a promise holding the answer to your problem
   */
  isLoggedIn(): Promise<boolean> {
    return new Promise(resolve => {
      this.socket.emit('isLoggedIn', this.uuid, (isLoggedIn) => {
        resolve(isLoggedIn);
      });
    });
  }

  /**
   * Sends a logout notification to the server
   */
  logout(): void {
    this.socket.emit('logout');
  }

  startRecording(): Promise<Response<string>> {
    return new Promise(resolve => {
      this.socket.emit('startRecording', this.uuid, (response) => {
        resolve(response);
      });
    });
  }

  doesRecordingExist(filename: string): Promise<boolean> {
    return new Promise(resolve => {
      this.socket.emit('doesRecordingExist', filename, (fileExistsStatus) => {
        resolve(fileExistsStatus);
      });
    });
  }

  stopRecording(filename: string): Promise<Response<string>> {
    return new Promise((resolve) => this.socket.emit('stopRecording', this.uuid, filename, resolve));
  }

  getLogs(): Promise<Response<FileInfo[]>> {
    return new Promise((resolve) => this.socket.emit('get-logs', undefined, resolve));
  }

  getRecordings(): Promise<Response<FileInfo[]>> {
    return new Promise((resolve) => this.socket.emit('get-recordings', undefined, resolve));
  }

  getFile(fileInfo: FileInfo): Promise<Response<string>> {
    return new Promise((resolve) => this.socket.emit('get-file', fileInfo, resolve));
  }

  private createUUID(): string {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  private s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}

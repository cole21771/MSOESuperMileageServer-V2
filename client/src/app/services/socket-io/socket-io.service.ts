import {EventEmitter, Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Config} from '../../models/interfaces/config/Config';
import {LoginData} from '../../models/interfaces/LoginData';
import {Response} from '../../models/interfaces/Response';
import {FileInfo} from '../../models/interfaces/FileInfo';
import Socket = SocketIOClient.Socket;
import {Marker} from '../../models/interfaces/Marker';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable()
export class SocketIoService {
  private socket: Socket; // The client instance of socket.io

  private newDataEmitter = new EventEmitter<any>();
  private newLocationEmitter = new EventEmitter<any>();
  private newMarkerEmitter = new EventEmitter<Marker>();
  private newErrorEmitter = new EventEmitter<any[]>();
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
  getSelectedConfig(): Promise<Config> {
    return new Promise((resolve, reject) => {
      this.socket.emit('getSelectedConfig', undefined, (response: Response<Config>) => {
        if (response.error) {
          reject(response.errorMessage);
        } else {
          resolve(response.data);
        }
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
      this.newDataEmitter.emit(data);
    });

    return this.newDataEmitter;
  }

  /**
   * Sets up a listener for newLocation and returns the newLocationEmitter so that the LocationService
   * can subscribe to new location notifications.
   *
   * @returns {EventEmitter<any>} the new location event emitter
   */
  getLocationEmitter(): EventEmitter<any> {
    this.socket.on('newLocation', this.newLocationEmitter.emit);
    return this.newLocationEmitter;
  }

  getMarkerEmitter(): EventEmitter<Marker> {
    this.socket.on('newMarker', this.newMarkerEmitter.emit);
    return this.newMarkerEmitter;
  }

  getErrorEmitter(): EventEmitter<any[]> {
    this.socket.on('newError', this.newErrorEmitter.emit);
    return this.newErrorEmitter;
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

  startRecording(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.socket.emit('startRecording', this.uuid, (response: Response<string>) => {
        if (response.error) {
          reject(response.errorMessage);
        } else {
          resolve(response.data);
        }
      });
    });
  }

  doesRecordingExist(filename: string): Promise<boolean> {
    return new Promise(resolve => this.socket.emit('doesRecordingExist', filename, resolve));
  }

  stopRecording(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.socket.emit('stopRecording', this.uuid, filename, (response: Response<string>) => {
        if (response.error) {
          reject(response.errorMessage);
        } else {
          resolve(response.data);
        }
      });
    });
  }

  getLogs(): Promise<Response<FileInfo[]>> {
    return new Promise((resolve) => this.socket.emit('get-logs', undefined, resolve));
  }

  getRecordings(): Promise<Response<FileInfo[]>> {
    return new Promise((resolve) => this.socket.emit('get-recordings', undefined, resolve));
  }

  getFile(fileInfo: FileInfo, inCsvFormat = false): Promise<Response<string>> {
    return new Promise((resolve) => this.socket.emit('get-file', fileInfo, inCsvFormat, resolve));
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

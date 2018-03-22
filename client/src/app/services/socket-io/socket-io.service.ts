import {EventEmitter, Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Config} from '../../models/interfaces/Config';
import {LoginData} from '../../models/interfaces/LoginData';
import {isSuccess} from '@angular/http/src/http_utils';
import {Response} from '../../models/interfaces/Response';

@Injectable()
export class SocketIoService {
  private socket: SocketIOClient.Socket; // The client instance of socket.io

  private newDataEmitter: EventEmitter<any> = new EventEmitter<any>();
  private newLocationEmitter: EventEmitter<any> = new EventEmitter<any>();
  private uuid: string;

  constructor() {
    this.socket = io();
    this.setupPerformanceMonitor();
    this.uuid = this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  /**
   * This is the performance monitor which will disconnect from the server when it notices that
   * the user is no longer focused on rendering this application.
   */
  private setupPerformanceMonitor() {
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

  private s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  /**
   * Sends a request to the server to get the selected configuration.
   *
   * @returns {Promise<Config>} a Promise holding the Config file.
   */
  getSelectedConfig(): Promise<Config> {
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
      this.socket.emit('isLoggedIn', undefined, (isLoggedIn) => {
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

  startRecording(): Promise<Response> {
    return new Promise(resolve => {
      this.socket.emit('startRecording', this.uuid, (response) => {
        resolve(response);
      });
    });
  }

  doesFileExist(filename: string): Promise<boolean> {
    return new Promise(resolve => {
      this.socket.emit('doesFileExist', filename, (fileExistsStatus) => {
        resolve(fileExistsStatus);
      });
    });
  }

  stopRecording(filename: string): Promise<Response> {
    return new Promise((resolve) => {
      this.socket.emit('stopRecording', this.uuid, filename, (response) => {
        resolve(response);
      });
    });
  }
}

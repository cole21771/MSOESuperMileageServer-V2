import {EventEmitter, Injectable} from '@angular/core';
import {ConfigService} from "../config/config.service";
import {SocketIoService} from "../socket-io/socket-io.service";
import Emitter = SocketIOClient.Emitter;

@Injectable()
export class DataService {
  labelDataMap: Map<string, number>;
  labels: string[];
  dataNotifierEmitter: EventEmitter<undefined>;

  constructor(private configService: ConfigService, private socketService: SocketIoService) {
    this.labelDataMap = new Map();

    this.labels = this.configService.getLabels;

    this.socketService.getNewDataEmitter().subscribe((data: number[]) => {
      this.addData(data);
    });
  }

  getLatestData(label: string) {
    return this.labelDataMap.get(label);
  }

  dataNotifier(): EventEmitter<undefined> {
    return this.dataNotifierEmitter;
  }

  addData(data: number[]) {
    this.labels.forEach((label: string, index: number) => {
      this.labelDataMap.set(label, data[index]);
    });

    this.dataNotifierEmitter.emit();
  }
}

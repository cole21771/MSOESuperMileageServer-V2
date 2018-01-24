import {EventEmitter, Injectable} from '@angular/core';
import {ConfigService} from "../config/config.service";

@Injectable()
export class DataService {
  labelEmitterMap: Map<string, EventEmitter<number>>;
  emitters: EventEmitter<number>[];

  constructor(private configService: ConfigService) {
    this.labelEmitterMap = new Map();
    this.configService.getOrder.forEach((label: string) => {
      this.labelEmitterMap.set(label, new EventEmitter<number>());
    });
  }

  getEmitterFor(label: string): EventEmitter<number> {
    return this.labelEmitterMap.get(label);
  }

  addData(data: number[]) {
    this.emitters.forEach((emitter: EventEmitter<number>, index: number) => {
      emitter.emit(data[index]);
    });
  }
}

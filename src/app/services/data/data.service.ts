import {EventEmitter, Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {SocketIoService} from '../socket-io/socket-io.service';
import {Model} from '../../interfaces/Model';

const FormulaParser = require('hot-formula-parser').Parser;

@Injectable()
export class DataService {
  private labelDataMap: Map<string, number>;
  private modelMap: Map<string, string>;
  private labels: string[];
  private dataNotifierEmitter: EventEmitter<undefined>;
  private onReadyEventEmitter: EventEmitter<undefined>;
  private parser: any;

  constructor(private configService: ConfigService, private socketService: SocketIoService) {
    this.dataNotifierEmitter = new EventEmitter<undefined>();
    this.onReadyEventEmitter = new EventEmitter<undefined>();
    this.labelDataMap = new Map();
    this.modelMap = new Map();
    this.parser = new FormulaParser();

    this.labels = this.configService.getLabels;

    this.socketService.getNewDataEmitter().subscribe((data: number[]) => {
      this.addData(data);
    });

    this.configService.getModels.forEach((model: Model) => {
      this.modelMap.set(model.label, model.formula);
    });
    setTimeout(() => {
      this.onReadyEventEmitter.emit();
    }, 500);
  }

  onReady(): EventEmitter<undefined> {
    return this.onReadyEventEmitter;
  }

  getLatestData(label: string): number {
    const data = this.labelDataMap.get(label);
    if (data) {
      return data;
    }

    const formula = this.modelMap.get(label);
    if (formula) {
      this.configService.getLabelsFromFormula(formula).forEach((variable) => {
        this.parser.setVariable(variable, this.labelDataMap.get(variable));
      });

      const results = this.parser.parse(formula);

      if (!results.error) {
        return results.result;
      } else {
        throw new Error('Parser Error: ' + results.error);
      }
    } else {
      throw new Error('DataService, getLatestData: model doesn\'t exist');
    }
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

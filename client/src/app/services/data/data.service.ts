import {EventEmitter, Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {SocketIoService} from '../socket-io/socket-io.service';
import {isNullOrUndefined} from 'util';
import {Marker} from '../../models/interfaces/Marker';
import {LocationInfo} from '../../models/interfaces/LocationInfo';

const FormulaParser = require('hot-formula-parser').Parser;

@Injectable()
export class DataService {
  private parser: any;

  private labelDataMap: Map<string, number>;
  private modelMap: Map<string, string>;
  private markerEmitterMap: Map<string, EventEmitter<Marker>>;

  private labels: string[];
  private dataNotifierEmitter: EventEmitter<undefined>;
  private locationNotifierEmitter: EventEmitter<LocationInfo>;

  constructor(private configService: ConfigService, private socketService: SocketIoService) {
    this.dataNotifierEmitter = new EventEmitter<undefined>();
    this.locationNotifierEmitter = new EventEmitter<LocationInfo>();

    this.labelDataMap = new Map();
    this.modelMap = new Map();
    this.markerEmitterMap = new Map();
    this.configService.getMarkers.forEach((marker) =>
      this.markerEmitterMap.set(marker.name, new EventEmitter<Marker>()));

    this.parser = new FormulaParser();

    this.labels = this.configService.getLabels;

    this.socketService.getNewDataEmitter().subscribe(this.addData.bind(this));
    this.socketService.getMarkerEmitter().subscribe(this.updateMarker.bind(this));

    this.configService.getModels.forEach(model => {
      this.modelMap.set(model.label, model.formula);
    });
  }

  /**
   * When provided a label, will search through the labelDataMap to find the latest data. If it
   * cannot find it there, then it will search through the modelMap to calculate the label's latest value.
   *
   * @param {string} label is the identifier for the data that needs to be returned.
   * @returns {number} the latest data for the label provided.
   */
  getLatestData(label: string): number {
    const data = this.labelDataMap.get(label);
    if (!isNullOrUndefined(data)) {
      return data;
    }

    const formula = this.modelMap.get(label);
    if (formula) {
      this.configService.getLabelsFromFormula(formula).forEach((variable) => {
        const value = this.labelDataMap.get(variable);
        this.parser.setVariable(variable, value ? value : 1); // TODO one
      });

      const results = this.parser.parse(formula);

      if (!results.error) {
        return results.result;
      } else {
        throw new Error('DataService, getLatestData: Parser Error: ' + results.error);
      }
    } else {
      throw new Error('DataService, getLatestData: model doesn\'t exist');
    }
  }

  /**
   * A getter for the data notifier event emitter so that graphs can subscribe to it and know
   * when there is new data to be had.
   *
   * @returns {EventEmitter<undefined>} The event emitter that they subscribe to
   */
  get dataNotifier(): EventEmitter<undefined> {
    return this.dataNotifierEmitter;
  }

  getMarkerEmitter(markerName: string): EventEmitter<Marker> {
    return this.markerEmitterMap.get(markerName);
  }

  get locationNotifier(): EventEmitter<LocationInfo> {
    return this.locationNotifierEmitter;
  }

  /**
   * When new data arrives in the system, it will be sent here to be put into the labelDataMap. After it is done
   * with that, it will send a notification to anybody who is subscribed to the dataNotifierEmitter
   *
   * @param {number[]} data is an array of new data that will be put into the labelDataMap
   */
  addData(data: number[]) {
    this.labels.forEach((label: string, index: number) => {
      this.labelDataMap.set(label, data[index]);
    });
    this.dataNotifierEmitter.emit();
  }

  updateMarker(marker: Marker): void {
    this.markerEmitterMap.get(marker.name).emit(marker);
  }

  getDataType(label: string): string {
    if (!!this.labelDataMap.get(label)) {
      return 'Data';
    } else if (!!this.modelMap.get(label)) {
      return 'Model';
    } else if (!!this.configService.getMarkers.find((mP) => `${mP.id}` === label)) {
      return 'Marker';
    }

    return undefined;
  }
}

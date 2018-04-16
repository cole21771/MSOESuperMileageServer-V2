import {IncomingData} from './IncomingData';
import {Model} from './Model';
import {View} from './View';
import {MarkerProperties} from './MarkerProperties';

export interface Config {
  vehicleType: string;
  incomingData: IncomingData[];
  markers: MarkerProperties[];
  errors: string[];
  models: Model[];
  views: View[];
}

import {IncomingData} from './IncomingData';
import {Model} from './Model';
import {View} from './View';

export interface Config {
  vehicleType: string;
  incomingData: IncomingData[];
  models: Model[];
  views: View[];
}

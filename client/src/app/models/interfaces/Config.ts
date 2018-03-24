import {IncomingData} from './IncomingData';
import {Graph} from './Graph';
import {Model} from './Model';
import {View} from './View';

export interface Config {
  vehicleType: string;
  incomingData: IncomingData[];
  graphs: Graph[];
  models: Model[];
  views: View[];
  displayAlways: string[];
}

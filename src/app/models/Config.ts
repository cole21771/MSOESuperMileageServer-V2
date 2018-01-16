import {IncomingData} from './IncomingData';
import {Graph} from './Graph';
import {Model} from './Model';

export interface Config {
  vehicleType: string;
  incomingData: IncomingData[];
  graphs: Graph[];
  model: Model[];
  displayAlways: string[];
}

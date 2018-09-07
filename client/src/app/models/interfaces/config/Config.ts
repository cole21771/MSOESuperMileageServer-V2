import {IncomingData} from './IncomingData';
import {Model} from './Model';
import {View} from './View';
import {MarkerProperties} from './MarkerProperties';
import {ErrorProperties} from './ErrorProperties';

export interface Config {
  vehicleType: string;
  incomingData: IncomingData[];
  markers: MarkerProperties[];
  errors: ErrorProperties[];
  models: Model[];
  views: View[];
}

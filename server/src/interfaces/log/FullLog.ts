import {Config} from '../../../../client/src/app/models/interfaces/config/Config';
import {TimestampedData} from './TimestampedData';

export interface FullLog {
    config: Config;
    data: Array<TimestampedData<number[]>>;
    locations: Array<TimestampedData<number[]>>;
    markers: Array<TimestampedData<number[]>>;
    errors: Array<TimestampedData<any[]>>;
}

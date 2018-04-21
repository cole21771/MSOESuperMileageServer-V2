import {Config} from '../../../client/src/app/models/interfaces/config/Config';
import {TimestampedData} from './interfaces/TimestampedData';

export class FullLog {
    private config: Config;
    private data: Array<TimestampedData<number[]>>;
    private locations: Array<TimestampedData<number[]>>;
    private markers: Array<TimestampedData<number[]>>;
    private errors: Array<TimestampedData<any[]>>;
    private _hasBufferedData: boolean;

    constructor(config?: Config) {
        this.config = config;
        this.data = [];
        this.locations = [];
        this.markers = [];
        this.errors = [];
    }

    public static getTimedData(data: any): TimestampedData<any> {
        return {timestamp: Date.now(), data};
    }

    public fromJSON(fullLog: FullLog) {
        this.config = fullLog.config;
        this.data = fullLog.data;
        this.locations = fullLog.locations;
        this.markers = fullLog.markers;
        this.errors = fullLog.errors;
    }

    public get hasBufferedData(): boolean {
        return this._hasBufferedData;
    }

    public resetBuffer(): void {
        this._hasBufferedData = false;
    }

    public get getData(): Array<TimestampedData<number[]>> {
        return this.data;
    }

    addData(data: number[]): void {
        this.data.push(FullLog.getTimedData(data));
        this._hasBufferedData = true;
    }

    addLocation(location: number[]): void {
        this.locations.push(FullLog.getTimedData(location));
        this._hasBufferedData = true;
    }

    addMarker(marker: number[]): void {
        this.markers.push(FullLog.getTimedData(marker));
        this._hasBufferedData = true;
    }

    addError(error: any[]): void {
        this.errors.push(FullLog.getTimedData(error));
        this._hasBufferedData = true;
    }
}

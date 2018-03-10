export class DataManager {
    recordedData: any[];
    isRecording: boolean;

    constructor(private socket, private fs) {
        this.recordedData = [];
        this.isRecording =  false;
    }

    public init() {
        this.socket.on('newData', (data) => {
            // TODO Verify data matches selected model?
            this.recordedData.push(data);
            this.socket.broadcast.emit('newData', data);
        });

        this.socket.on('record', (data, callback) => {
            this.isRecording = true;
            callback(true);
        });

        this.socket.on('stop', (filename, callback) => {
            this.fs.writeFile(filename, JSON.stringify(this.recordedData, undefined, 4), (err) => {
                this.isRecording = false;
                callback(!!err);
            });
        });
    }
}

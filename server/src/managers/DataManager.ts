import Socket = SocketIO.Socket;
import {LogManager} from './LogManager';

export class DataManager {
    constructor(private fs, private logger: LogManager) {
    }

    public init(socket: Socket) {
        socket.on('newData', (data) => {
            this.logger.logData(JSON.parse(data));
            socket.broadcast.emit('newData', data);
        });

        socket.on('record', (filename, callback) => {
            this.logger.startRecording(filename).then(isSuccessful => {
                callback(isSuccessful);
            });
        });

        socket.on('stopRecording', (callback) => {
            this.logger.stopRecording().then(isSuccessful => {
                callback(isSuccessful);
            });
        });
    }
}

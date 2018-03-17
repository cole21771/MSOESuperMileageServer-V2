import Socket = SocketIO.Socket;
import {LogManager} from './LogManager';

export class DataManager {
    constructor(private fs, private logger: LogManager) {
    }

    public init(socket: Socket) {
        socket.on('newData', data => {
            this.logger.logData(JSON.parse(data));
            socket.broadcast.emit('newData', data);
        });

        socket.on('newLocation', location => {
            console.log(location);
        });

        socket.on('startRecording', (undefined, callback) => {
            callback(this.logger.startRecording(socket));
        });

        socket.on('stopRecording', (filename, callback) => {
            this.logger.stopRecording(socket, filename).then(isSuccessful => {
                callback(isSuccessful);
            });
        });
    }
}

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

        socket.on('stopRecording', async (filename, callback) => {
            callback(await this.logger.stopRecording(socket, filename));
        });

        socket.on('doesFileExist', async (filename, callback) => {
            callback(await this.logger.doesFileExist(filename));
        });
    }
}

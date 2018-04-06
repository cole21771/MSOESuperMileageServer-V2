import Socket = SocketIO.Socket;
import {LogManager} from './LogManager';

export class DataManager {
    constructor(private fs, private logger: LogManager) {
    }

    public init(socket: Socket) {
        socket.on('newData', (data) => {
            try {
                const parsedData = JSON.parse(data);

                if (Array.isArray(parsedData)) {
                    this.logger.logData(parsedData);
                    socket.broadcast.emit('newData', data);
                } else {
                    console.error('DataManager, newData:', 'parsedData is not an Array!`');
                }
            } catch (err) {
                console.error('DataManager, newData:', 'Error Parsing JSON!\n\n', data, err);
            }
        });

        socket.on('newLocation', (location) => {
            console.log(location);
        });

        socket.on('startRecording', (uuid, callback) => {
            callback(this.logger.startRecording(uuid));
        });

        socket.on('stopRecording', async (uuid, filename, callback) => {
            callback(await this.logger.stopRecording(uuid, filename));
        });

        socket.on('doesRecordingExist', async (filename, callback) => {
            callback(await this.logger.doesRecordingExist(filename));
        });
    }
}

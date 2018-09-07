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
                    socket.broadcast.emit('newData', parsedData);
                } else {
                    console.error('DataManager, newData:', 'parsedData is not an Array!');
                }
            } catch (err) {
                console.error('DataManager, newData:', 'Error parsing JSON!\n\n', data, err);
            }
        });

        socket.on('newLocation', (location) => {
            try {
                const parsedLocation = JSON.parse(location);

                if (Array.isArray(parsedLocation)) {
                    this.logger.logLocation(parsedLocation);
                    socket.broadcast.emit('newLocation', parsedLocation);
                } else {
                    console.error('DataManager, newLocation:', 'parsedLocation is not an Array!');
                }
            } catch (err) {
                console.error('DataManager, newLocation:', 'Error parsing JSON!\n\n', location, err);
            }
        });

        socket.on('new-marker', (markerArray) => {
            try {
                const parsedMarker = JSON.parse(markerArray);
                if (Array.isArray(parsedMarker)) {
                    this.logger.logMarker(parsedMarker);
                    socket.broadcast.emit('newMarker', {
                        id: parsedMarker[0],
                        timestamp: parsedMarker[1],
                        marker: parsedMarker[2]
                    });
                }
            } catch (err) {
                console.error('DataManager, newMarker:', 'Error parsing JSON!\n\n', markerArray, err);
            }
        });

        socket.on('new-error', (errorArray) => {
            try {
                const parsedError = JSON.parse(errorArray);
                if (Array.isArray(parsedError)) {
                    this.logger.logError(parsedError);
                    socket.broadcast.emit('newError', {
                        id: parsedError[0],
                        timestamp: parsedError[1],
                        marker: parsedError[2]
                    });
                }
            } catch (err) {
                console.error('DataManager, newError:', 'Error parsing JSON!\n\n', errorArray, err);
            }
        });
    }
}

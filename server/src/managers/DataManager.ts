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
                    socket.broadcast.emit('new-location', parsedLocation);
                } else {
                    console.error('DataManager, newLocation:', 'parsedLocation is not an Array!');
                }
            } catch (err) {
                console.error('DataManager, newLocation:', 'Error parsing JSON!\n\n', location, err);
            }
        });

        socket.on('new-marker', (markerArray) => {
            const parsedMarker = JSON.parse(markerArray);

            socket.broadcast.emit('new-marker', {
                id: parsedMarker[0],
                timestamp: parsedMarker[1],
                marker: parsedMarker[2]
            });
        });

        socket.on('new-error', (errorArray) => {
            console.log(errorArray);
        });
    }
}

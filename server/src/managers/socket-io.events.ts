import {AuthManager} from './auth';
import {ConfigManager} from './config';
import {DataManager} from './data';

/**
 * Creates the different socket.io managers and initializes them
 */
export class SocketIoEvents {
    constructor(private fs, private io) {
    }

    init() {
        this.io.on('connection', (socket) => {
            const auth = new AuthManager(socket);
            auth.init();
            const data = new DataManager(socket);
            data.init();

            const config = new ConfigManager(socket, this.fs);
            config.init();
        });
    }
}

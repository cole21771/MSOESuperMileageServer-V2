import {AuthManager} from './AuthManager';
import {ConfigManager} from './ConfigManager';
import {DataManager} from './DataManager';
import {LogManager} from './LogManager';

/**
 * Creates the different socket.io managers and initializes them
 */
export class SocketIoEvents {
    private auth: AuthManager;
    private logger: LogManager;
    private data: DataManager;
    private config: ConfigManager;

    constructor(private fs, private io) {
        this.logger = new LogManager(this.fs);
        this.logger.init();

        this.auth = new AuthManager();
        this.data = new DataManager(this.fs, this.logger);
        this.config = new ConfigManager(this.fs);
    }

    init() {
        this.io.on('connection', (socket) => {
            this.auth.init(socket);
            this.data.init(socket);
            this.config.init(socket);
        });
    }
}

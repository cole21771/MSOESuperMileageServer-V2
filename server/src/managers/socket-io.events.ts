import {ServerConfig} from '../interfaces/ServerConfig';
import {AuthManager} from './auth';
import {ConfigManager} from './config';
import {DataManager} from './data';

export class SocketIoEvents {
    private SERVER_CONFIG = './server-config.json';
    private serverConfig: ServerConfig;

    constructor(private fs, private io) {
        this.serverConfig = JSON.parse(fs.readFileSync(this.SERVER_CONFIG, 'utf8'));
    }

    init() {
        this.io.on('connection', (socket) => {
            const auth = new AuthManager(socket);
            auth.init();
            const data = new DataManager(socket);
            data.init();

            const config = new ConfigManager(socket, this.fs);
            config.setServerConfig(this.serverConfig);
        });
    }
}

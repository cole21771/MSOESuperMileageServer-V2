import {ServerConfig} from '../interfaces/ServerConfig';
import {AuthManager} from './auth';
import {ConfigManager} from './config';
import {DataManager} from './data';

export class SocketIoEvents {
    private SERVER_CONFIG = './server-config.json';
    private serverConfig: ServerConfig;

    constructor(private fs, private io) {
        this.serverConfig = JSON.parse(fs.readFileSync(this.SERVER_CONFIG, 'utf8'));

        io.on('connection', (socket) => {
            const auth = new AuthManager(socket);
            const data = new DataManager(socket);

            const config = new ConfigManager(socket, fs);
            config.setServerConfig(this.serverConfig);
        });
    }
}

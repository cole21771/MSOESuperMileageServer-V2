import Socket = SocketIO.Socket;
import {isUndefined} from 'util';
import {Config} from '../../../client/src/app/models/interfaces/config/Config';
import {Response} from '../models/interfaces/Response';
import {ServerConfig} from '../models/interfaces/ServerConfig';

/**
 * A class that holds all of the socket.io listeners for anything related to
 * configuration files.
 */
export class ConfigManager {
    private CONFIG_PATH = './configurations';
    private SERVER_CONFIG_PATH = './server-config.json';
    private serverConfig: ServerConfig;

    constructor(private fs) {
        this.serverConfig = JSON.parse(fs.readFileSync(this.SERVER_CONFIG_PATH, 'utf8'));

        if (!this.fs.existsSync(this.CONFIG_PATH)) {
            this.fs.mkdirSync(this.CONFIG_PATH);
        }
    }

    /**
     * Sets of all of the listeners for socket.io
     */
    public init(socket: Socket) {
        /**
         * A listener for any clients to use to get the current selected configuration file.
         */
        socket.on('getSelectedConfig', (undefined, callback) => {
            this.getConfig.then(callback).catch(callback);
        });

        /**
         * Allows a logged in client to change the selected configuration file
         */
        socket.on('setSelectedConfig', (newConfigFilename, callback) => {
            if (this.fs.existsSync(`${this.CONFIG_PATH}/${newConfigFilename}`)) {
                this.serverConfig.selectedConfig = newConfigFilename;
                this.fs.writeFileSync(this.SERVER_CONFIG_PATH, this.serverConfig, 'utf8');
                callback(true);
            } else {
                callback(`File doesn't exist!`);
            }
        });

        /**
         * Allows a logged in client to 'post' a new configuration file that they just created
         */
        socket.on('createConfig', (data, callback) => {
            if (!this.fs.existsSync(data.filename)) {
                this.fs.writeFileSync(`${this.CONFIG_PATH}/${data.filename}`, data.config, 'utf8');
            } else {
                callback('File already exists, cannot overwrite it!');
            }
        });

        /**
         * Allows a logged in client to update a configuration file
         */
        socket.on('updateConfig', (data, callback) => {
            if (this.fs.existsSync(`${this.CONFIG_PATH}/${data.filename}`)) {
                this.fs.writeFileSync(`${this.CONFIG_PATH}/${data.filename}`, data.config, 'utf8');
            } else {
                callback(`Can't update a file that doesn't exist!`);
            }
        });
    }

    public getCSVTitle(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.getConfig.then((res: Response<Config>) => {
                const config = res.data;

                let csv = '';
                config.incomingData.forEach((data, index) => {
                    csv += data.label.replace(/_/g, ' ');
                    if (index !== config.incomingData.length - 1) {
                        csv += ', ';
                    }
                });

                resolve(csv + '\n');
            }).catch((errRes: Response<undefined>) => {
                throw new Error('ConfigManager, getCSVTitle: \n\n' + errRes.errorMessage);
            });
        });
    }

    public get getConfig(): Promise<Response<Config>> {
        return new Promise((resolve, reject) => {
            this.fs.readFile(`${this.CONFIG_PATH}/${this.serverConfig.selectedConfig}`, 'utf8', (err, file) => {
                if (err) {
                    const errorString = 'ConfigManager, getSelectedConfig: ' + err;
                    console.error(errorString);
                    reject({error: true, errorMessage: errorString});
                }
                resolve({error: false, data: JSON.parse(file)});
            });
        });
    }
}

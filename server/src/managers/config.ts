import {ServerConfig} from '../interfaces/ServerConfig';

/**
 * A class that holds all of the socket.io listeners for anything related to
 * configuration files.
 */
export class ConfigManager {
    private SERVER_CONFIG = './server-config.json';
    private serverConfig: ServerConfig;

    constructor(private socket, private fs) {
        this.serverConfig = JSON.parse(fs.readFileSync(this.SERVER_CONFIG, 'utf8'));
    }

    /**
     * Sets of all of the listeners for socket.io
     */
    public init() {
        /**
         * A listener for any clients to use to get the current selected configuration file.
         */
        this.socket.on('getSelectedConfig', (data, callback) => {
            this.fs.readFile(`${this.serverConfig.configPath}/${this.serverConfig.selectedConfig}`, 'utf8', (err, file) => {
                callback(JSON.parse(file));
            });
        });

        /**
         * Allows a logged in client to change the selected configuration file
         */
        this.socket.on('setSelectedConfig', (newConfigFilename, callback) => {
            if (this.fs.existsSync(`${this.serverConfig.configPath}/${newConfigFilename}`)) {
                this.serverConfig.selectedConfig = newConfigFilename;
                this.fs.writeFileSync(this.SERVER_CONFIG, this.serverConfig, 'utf8');
                callback(true);
            } else {
                callback('File doesn\'t exist!');
            }
        });

        /**
         * Allows a logged in client to 'post' a new configuration file that they just created
         */
        this.socket.on('createConfig', (data, callback) => {
            if (!this.fs.existsSync(data.filename)) {
                this.fs.writeFileSync(`${this.serverConfig.configPath}/${data.filename}`, data.config, 'utf8');
            } else {
                callback('File already exists, cannot overwrite it!');
            }
        });

        /**
         * Allows a logged in client to update a configuration file
         */
        this.socket.on('updateConfig', (data, callback) => {
            if (this.fs.existsSync(`${this.serverConfig.configPath}/${data.filename}`)) {
                this.fs.writeFileSync(`${this.serverConfig.configPath}/${data.filename}`, data.config, 'utf8');
            } else {
                callback('Can\'t update a file that doesn\'t exist!');
            }
        });
    }
}

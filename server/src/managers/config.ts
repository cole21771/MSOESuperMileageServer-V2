import {ServerConfig} from '../interfaces/ServerConfig';

export class ConfigManager {
    private SERVER_CONFIG = './../server-config.json';
    private serverConfig: ServerConfig;

    constructor(private socket, private fs) {
        this.init();
    }

    public setServerConfig(serverConfig: ServerConfig) {
        this.serverConfig = serverConfig;
    }

    public init() {
        this.socket.on('getSelectedConfig', (data, callback) => {
            this.fs.readFile(`${this.serverConfig.configPath}/${this.serverConfig.selectedConfig}`, 'utf8', (err, file) => {
                callback(JSON.parse(file));
            });
        });

        this.socket.on('setSelectedConfig', (newConfigFilename, callback) => {
            if (this.fs.existsSync(`${this.serverConfig.configPath}/${newConfigFilename}`)) {
                this.serverConfig.selectedConfig = newConfigFilename;
                this.fs.writeFileSync(this.SERVER_CONFIG, this.serverConfig, 'utf8');
                callback(true);
            } else {
                callback('File doesn\'t exist!');
            }
        });

        this.socket.on('createConfig', (data, callback) => {
            if (!this.fs.existsSync(data.filename)) {
                this.fs.writeFileSync(`${this.serverConfig.configPath}/${data.filename}`, data.config, 'utf8');
            } else {
                callback('File already exists, cannot overwrite it!');
            }
        });

        this.socket.on('updateConfig', (data, callback) => {
            if (this.fs.existsSync(`${this.serverConfig.configPath}/${data.filename}`)) {
                this.fs.writeFileSync(`${this.serverConfig.configPath}/${data.filename}`, data.config, 'utf8');
            } else {
                callback('Can\'t update a file that doesn\'t exist!');
            }
        });
    }
}

interface ServerConfig {
    configPath: string;
    selectedConfig: string;
}

export class SocketIoEvents {
    private SERVER_CONFIG = './server-config.json';
    private serverConfig: ServerConfig;

    constructor(private fs, private io) {
        this.serverConfig = JSON.parse(fs.readFileSync(this.SERVER_CONFIG, 'utf8'));

        io.on('connection', socket => {
            const auth = new AuthManager(socket);
            const data = new DataManager(io, socket);

            const config = new ConfigManager(socket, fs);
            config.setServerConfig(this.serverConfig);
        });
    }
}

class AuthManager {
    private isLoggedIn: boolean;

    constructor(private socket) {
        this.isLoggedIn = false;
        this.init();
    }

    init() {
        this.socket.on('disconnect', () => {
            this.isLoggedIn = false;
        });

        this.socket.on('attemptLogin', (data, callback) => {
            const admin = {
                username: 'admin',
                password: 'ducks'
            };

            this.isLoggedIn = data.username === admin.username && data.password === admin.password;

            callback(this.isLoggedIn);
        });

        this.socket.on('logout', () => {
            this.isLoggedIn = false;
        });

        this.socket.on('isLoggedIn', (data, callback) => {
            callback(this.isLoggedIn);
        });
    }
}

class ConfigManager {
    private SERVER_CONFIG = './server-config.json';
    private serverConfig: ServerConfig;

    constructor(private socket, private fs) {
        this.init();
    }

    setServerConfig(serverConfig: ServerConfig) {
        this.serverConfig = serverConfig;
    }

    init() {
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

class DataManager {
    constructor(private io, private socket) {
        this.init();
    }

    init() {
        this.socket.on('newData', data => {
            // Verify data matches selected model
            this.io.emit('newData', data);
        });
    }
}

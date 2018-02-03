interface ServerConfig {
    configPath: string;
    selectedConfig: string;
}

export class SocketIoEvents {
    private SERVER_CONFIG = './server-config.json';

    private serverConfig: ServerConfig;
    private loggedInUsers: any[];

    constructor(private fs, private io) {
        this.loggedInUsers = [];

        fs.readFile(this.SERVER_CONFIG, 'utf8', (err, file) => {
            if (err) {
                throw err;
            }
            this.serverConfig = JSON.parse(file);
        });

        io.on('connection', socket => {
            socket.on('disconnect', () => {
                this.loggedInUsers.splice(this.loggedInUsers.findIndex(value => value === socket), 1);
            });

            socket.on('newData', data => {
                // Verify data matches selected model
                io.emit('newData', data);
            });

            socket.on('attemptLogin', (data, callback) => {
                const admin = {
                    username: 'admin',
                    password: 'ducks'
                };

                const isLoggedIn = data.username === admin.username && data.password === admin.password;

                if (isLoggedIn) {
                    this.loggedInUsers.push(socket);
                }

                callback(isLoggedIn);
            });

            socket.on('logout', () => {
                this.loggedInUsers.splice(this.loggedInUsers.findIndex(value => value === socket), 1);
            });

            socket.on('getSelectedConfig', (data, callback) => {
                fs.readFile(`${this.serverConfig.configPath}/${this.serverConfig.selectedConfig}`, 'utf8', (err, file) => {
                    callback(JSON.parse(file));
                });
            });
//
            /**
             * Sets the configuration file
             */
            socket.on('setSelectedConfig', (newConfigFilename, callback) => {
                if (fs.existsSync(`${this.serverConfig.configPath}/${newConfigFilename}`)) {
                    this.serverConfig.selectedConfig = newConfigFilename;
                    fs.writeFileSync(this.SERVER_CONFIG, this.serverConfig, 'utf8');
                    callback(true);
                } else {
                    callback('File doesn\'t exist!');
                }
            });

            socket.on('createConfig', (data, callback) => {
                if (!fs.existsSync(data.filename)) {
                    fs.writeFileSync(`${this.serverConfig.configPath}/${data.filename}`, data.config, 'utf8');
                } else {
                    callback('File already exists, cannot overwrite it!');
                }
            });

            socket.on('updateConfig', (data, callback) => {
                if (fs.existsSync(`${this.serverConfig.configPath}/${data.filename}`)) {
                    fs.writeFileSync(`${this.serverConfig.configPath}/${data.filename}`, data.config, 'utf8');
                } else {
                    callback('Can\'t update a file that doesn\'t exist!');
                }
            });

            socket.on('isLoggedIn', (data, callback) => {
                callback(this.loggedInUsers.includes(socket));
            });
        });
    }
}

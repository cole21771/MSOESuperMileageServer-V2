const serverConfigPath = './src/server/server-configuration.json';
let loggedInUsers = [];

class ServerConfig {

}

module.exports = (io, fs, logger) => {
  let serverConfig;
  fs.readFile(serverConfigPath, 'utf8', (err, file) => {
    serverConfig = JSON.parse(file);
  });

  io.of('/').on('connection', (socket) => {
    socket.on('disconnect', () => {
      loggedInUsers.splice(loggedInUsers.findIndex(value => value === socket), 1);
    });

    socket.on('newData', (data) => {
      // Verify data matches selected model
      io.emit('newData', data);
    });

    socket.on('attemptLogin', (data, callback) => {
      let admin = {
        username: 'admin',
        password: 'ducks'
      };

      let isLoggedIn = data.username === admin.username && data.password === admin.password;

      if (isLoggedIn)
        loggedInUsers.push(socket);

      callback(isLoggedIn);
    });

    socket.on('logout', () => {
      loggedInUsers.splice(loggedInUsers.findIndex(value => value === socket), 1);
    });

    socket.on('getSelectedConfig', (data, callback) => {
      fs.readFile(`${serverConfig.configPath}/${serverConfig.selectedConfiguration}`, 'utf8', (err, file) => {
        callback(JSON.parse(file));
      });
    });

    /**
     * Sets the configuration file
     */
    socket.on('setSelectedConfig', (newConfigFilename, callback) => {
      if (fs.existsSync(`${serverConfig.configPath}/${newConfigFilename}`)) {
        serverConfig.selectedConfig = newConfigFilename;
        fs.writeFileSync(serverConfigPath, serverConfig, 'utf8');
        callback(true);
      } else {
        callback("File doesn't exist!");
      }
    });

    socket.on('createConfig', (data, callback) => {
      if (!fs.existsSync(data.filename)) {
        fs.writeFileSync(`${serverConfig.configPath}/${data.filename}`, data.config, 'utf8');
      } else {
        callback("File already exists, cannot overwrite it!");
      }
    });

    socket.on('updateConfig', (data, callback) => {
      if (fs.existsSync(`${serverConfig.configPath}/${data.filename}`)) {
        fs.writeFileSync(`${serverConfig.configPath}/${data.filename}`, data.config, 'utf8');
      } else {
        callback("Can't update a file that doesn't exist!");
      }
    });

    socket.on('isLoggedIn', (undefined, callback) => {
      callback(loggedInUsers.includes(socket));
    });
  });
};

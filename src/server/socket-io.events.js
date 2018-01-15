let loggedInUsers = [];

module.exports = (io, fs, logger) => {
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

    socket.on('getIncomingDataFormat', (data, callback) => {
      let file = fs.readFileSync('./src/server/configurations/incomingDataFormat.json', 'utf8');
      callback(JSON.parse(file));
    });

    socket.on('isLoggedIn', (undefined, callback) => {
      callback(loggedInUsers.includes(socket));
    });
  });
};

module.exports = (io, promiseIO, fs, logger) => {
  io.of('/').on('connection', (socket) => {
    socket.on('newData', (data) => {
      console.log('receive');
      //logger.logData(data);
      io.emit('newData', data);
      //return Promise.resolve(data);
    });

    socket.on('attemptLogin', (data) => {
      console.log('test');
      let admin = {
        username: 'admin',
        password: 'ducksAndShit'
      };

      if (data.username === admin.username && data.password === admin.password) {
        socket.emit('loginResponse', {error: false});
      } else {
        socket.emit('loginResponse', {error: true});
      }
    });

    socket.on('getVehicles', () => {
      let vehicles = fs.readdirSync('./src/server/vehicles/');
      socket.emit('vehiclesList', vehicles.toString());
    });
  });

  /**********************************************************************************************************************/
  promiseIO.on('connection', (socket) => {
    socket.on('getIncomingDataFormat', () => {
      let file = fs.readFileSync('./src/server/vehicles/electric/incomingDataFormat.json', 'utf8');
      return Promise.resolve(JSON.parse(file));
    });
  });
};

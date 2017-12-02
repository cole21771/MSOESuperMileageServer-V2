module.exports = (io, fs, logger) => {
  io.of('/').on('connection', (socket) => {
    socket.on('newData', (data) => {
      io.emit('newData', data);
    });

    socket.on('attemptLogin', (data, callback) => {
      let admin = {
        username: 'admin',
        password: 'ducksAndShit'
      };

      callback(data.username === admin.username && data.password === admin.password);
    });

    socket.on('getVehicles', () => {
      let vehicles = fs.readdirSync('./src/server/vehicles/');
      socket.emit('vehiclesList', vehicles.toString());
    });

    socket.on('getIncomingDataFormat', (data, callback) => {
      let file = fs.readFileSync('./src/server/vehicles/electric/incomingDataFormat.json', 'utf8');
      callback(JSON.parse(file));
    });
  });
};

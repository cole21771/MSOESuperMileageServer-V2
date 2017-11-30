module.exports = (io, logger) => {
  io.sockets.on('connection', (socket) => {
    socket.on('newData', (data) => {
      //logger.logData(data);
      io.emit('newData', data);
    });

    socket.on('attemptLogin', (data) => {
      let admin = {
        username: 'admin',
        password: 'ducksAndShit'
      };

      if (data.username === admin.username && data.password === admin.password) {
        socket.emit('loginResponse', {error: false});
      } else {
        socket.emit('loginResponse', {error: true})
      }
    })


  });
};


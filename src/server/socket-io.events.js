module.exports = (io, logger) => {
  io.sockets.on('connection', (socket) => {
    socket.on('newData', (data) => {
      logger.logData(data);
      io.emit('newData', data);
    });
  });
};


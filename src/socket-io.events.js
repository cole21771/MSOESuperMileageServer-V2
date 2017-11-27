module.exports = (io) => {
  io.sockets.on('connection', (socket) => {

    socket.on('newData', (data) => {
      //console.log(data);
      io.emit('newData', data);
    });





  });
};

import {SocketIoEvents} from './socket-io.events';

const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();
app.use(require('compression')());

// const winston = require('winston');
// const logger = require('./logger')(winston);

// Parsers for POST data
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
console.log(__dirname);
// Point static path to dist
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Catch all other routes and return the index file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const socketIoEvents = new SocketIoEvents(fs, io);

const port = 3000;
server.listen(port, (err) => {
  if (err) {
      throw err;
  }
  console.log(`Listening on port ` + port);
});
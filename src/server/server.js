// Get dependencies
const express = require('express');
const app = express();
app.use(require('compression')());

const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const path = require('path');

const winston = require('winston');
const logger = require('./logger')(winston);
require('./socket-io.events')(io, logger);

// Parsers for POST data
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../../dist')));

// Catch all other routes and return the index file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

let port = 3000;
server.listen(port, () => console.log(`Listening on port ` + port));

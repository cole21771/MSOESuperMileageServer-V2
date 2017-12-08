const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();
app.use(require('compression')());

const winston = require('winston');
const logger = require('./logger')(winston);

// Parsers for POST data
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../../dist')));

app.use((req, res, next) => {
  if(req.secure) {
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url);
  }
});

// Catch all other routes and return the index file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

const options = {
  /*key: fs.readFileSync(path.join(__dirname, 'certificates/server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certificates/server.crt')),*/
  spdy: {
    plain: true,
    ssl: false
  }
};

const http2 = require('spdy').createServer(options, app);
const io = require('socket.io').listen(http2);
require('./socket-io.events')(io, fs, logger);

const port = 3000;
http2.listen(port, (err) => {
  if (err)
    throw err;
  console.log(`Listening on port ` + port)
});

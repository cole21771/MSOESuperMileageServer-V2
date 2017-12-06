const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();
app.use(require('compression')());

const http2 = require('spdy');
/*
const winston = require('winston');
const logger = require('./logger')(winston);
// Parsers for POST data
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../../dist')));*/

// Catch all other routes and return the index file
/*app.get('/!*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});*/

app.get('/', (req, res) => {
  res.send('hello, http2!');
});

app.get('/pushy', (req, res) => {
  let stream = res.push('/main.js', {
    status: 200, // optional
    method: 'GET', // optional
    request: {
      accept: '*/*'
    },
    response: {
      'content-type': 'application/javascript'
    }
  });

  stream.on('error', () => {});
  stream.end('alert("hello from push stream!");');
  res.end('<script src="../../dist/index.html"></script>')
});

const options = {
  key: fs.readFileSync(path.join(__dirname, 'certificates/server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certificates/server.crt'))
};
const server = http2.createServer(options, app);
/*const io = require('socket.io').listen(server);
require('./socket-io.events')(io, fs, logger);*/

const port = 3000;
server.listen(port, () => console.log(`Listening on port ` + port));

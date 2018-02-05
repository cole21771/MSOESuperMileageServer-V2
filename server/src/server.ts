import {SocketIoEvents} from './managers/socket-io.events';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as socketIo from 'socket.io';

const app = express();
app.use(compression());

// const winston = require('winston');
// const logger = require('./logger')(winston);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
console.log(__dirname);
// Point static path to dist
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Catch all other routes and return the index file
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

const server = http.createServer(app);
const io = socketIo.listen(server);

const socketIoEvents = new SocketIoEvents(fs, io);

const port = 3000;
server.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Listening on port ` + port);
});

import {SocketIoEvents} from './managers/SocketIoEvents';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as fs from 'fs';
import {createServer, Server} from 'http';
import * as path from 'path';
import * as socketIo from 'socket.io';

export class SmvServer {
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private socketIoEvents: SocketIoEvents;

    constructor() {
        this.app = express();
        this.initExpress();

        this.server = createServer(this.app);
        this.io = socketIo.listen(this.server);

        this.socketIoEvents = new SocketIoEvents(fs, this.io);
        this.socketIoEvents.init();

        this.listen(3000);
    }

    private initExpress(): void {
        this.app.use(compression());

        // Parsers for POST data
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        console.log(__dirname);

        // Point static path to dist
        this.app.use(express.static(path.join(__dirname, '../../client/dist')));

        // Catch all other routes and return the index file
        this.app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
        });
    }

    private listen(port: number): void {
        this.server.listen(port, (err) => {
            if (err) {
                throw err;
            }
            console.log(`Listening on port ${port}`);
        });
    }
}

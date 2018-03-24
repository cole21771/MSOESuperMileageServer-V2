import {LoginData} from '../interfaces/LoginData';
import Socket = NodeJS.Socket;
import {LogManager} from './LogManager';

/**
 * A class that holds all of the socket.io listeners for anything related to user
 * authentication.
 */
export class AuthManager {
    private loggedInUsers: string[];

    constructor(private logger: LogManager) {
        this.loggedInUsers = [];
    }

    public init(socket: Socket) {
        /**
         * When called, it checks if the username and password match the pre-defined
         * username and password setup below and returns the status of the user.
         */
        socket.on('attemptLogin', (data: LoginData, callback) => {
            const admin = {
                username: 'admin',
                password: 'ducks',
            };

            const loggedIn = data.username === admin.username && data.password === admin.password;
            if (loggedIn) {
                this.loggedInUsers.push(data.uuid);
            }

            callback(loggedIn);
        });

        /**
         * Used by the auth guard in the frontend to check whether or not this socket
         * is logged in
         */
        socket.on('isLoggedIn', (uuid, callback) => {
            callback(this.loggedInUsers.indexOf(uuid) >= 0);
        });

        /**
         * Logout listener
         */
        socket.on('logout', (uuid) => {
            this.logout(uuid);
        });

        /**
         * When the user disconnects from the server, their login status goes away.
         */
        socket.on('client-disconnect', (uuid) => {
            this.logout(uuid);
        });
    }

    private logout(uuid: string) {
        this.logger.stopRecording(uuid);
        this.loggedInUsers.splice(this.loggedInUsers.indexOf(uuid));
    }
}

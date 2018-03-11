import {LoginData} from '../interfaces/LoginData';
import Socket = NodeJS.Socket;

/**
 * A class that holds all of the socket.io listeners for anything related to user
 * authentication.
 */
export class AuthManager {
    private loggedInUsers: Socket[];

    constructor() {
        this.loggedInUsers = [];
    }

    public init(socket: Socket) {
        /**
         * When the user disconnects from the server, their login status goes away.
         */
        socket.on('disconnect', () => {
            this.loggedInUsers.splice(this.loggedInUsers.indexOf(socket), 1);
        });

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
                this.loggedInUsers.push(socket);
            }

            callback(loggedIn);
        });

        /**
         * Used by the auth guard in the frontend to check whether or not this socket
         * is logged in
         */
        socket.on('isLoggedIn', (data, callback) => {
            callback(this.loggedInUsers.indexOf(socket) < 0);
        });

        /**
         * Logout listener
         */
        socket.on('logout', () => {
            this.loggedInUsers.splice(this.loggedInUsers.indexOf(socket), 1);
        });
    }
}

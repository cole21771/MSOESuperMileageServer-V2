import {LoginData} from '../interfaces/LoginData';

/**
 * A class that holds all of the socket.io listeners for anything related to user
 * authentication.
 */
export class AuthManager {
    private isLoggedIn: boolean;

    constructor(private socket) {
        this.isLoggedIn = false;
    }

    public init() {
        /**
         * When the user disconnects from the server, their login status goes away.
         */
        this.socket.on('disconnect', () => {
            this.isLoggedIn = false;
        });

        /**
         * When called, it checks if the username and password match the pre-defined
         * username and password setup below and returns the status of the user.
         */
        this.socket.on('attemptLogin', (data: LoginData, callback) => {
            const admin = {
                username: 'admin',
                password: 'ducks',
            };

            this.isLoggedIn = data.username === admin.username && data.password === admin.password;

            callback(this.isLoggedIn);
        });

        /**
         * Used by the auth guard in the frontend to check whether or not this socket
         * is logged in
         */
        this.socket.on('isLoggedIn', (data, callback) => {
            callback(this.isLoggedIn);
        });

        /**
         * Logout listener
         */
        this.socket.on('logout', () => {
            this.isLoggedIn = false;
        });
    }
}

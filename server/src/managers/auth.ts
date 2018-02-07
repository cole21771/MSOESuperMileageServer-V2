export class AuthManager {
    private isLoggedIn: boolean;

    constructor(private socket) {
        this.isLoggedIn = false;
    }

    public init() {
        this.socket.on('disconnect', () => {
            this.isLoggedIn = false;
        });

        this.socket.on('attemptLogin', (data, callback) => {
            const admin = {
                username: 'admin',
                password: 'ducks',
            };

            this.isLoggedIn = data.username === admin.username && data.password === admin.password;

            callback(this.isLoggedIn);
        });

        this.socket.on('logout', () => {
            this.isLoggedIn = false;
        });

        this.socket.on('isLoggedIn', (data, callback) => {
            callback(this.isLoggedIn);
        });
    }
}

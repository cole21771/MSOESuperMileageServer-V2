export class DataManager {
    constructor(private socket) {
        this.init();
    }

    public init() {
        this.socket.on('newData', (data) => {
            // TODO Verify data matches selected model
            this.socket.broadcast.emit('newData', data);
        });
    }
}

export class DataManager {
    constructor(private socket) {
    }

    public init() {
        this.socket.on('newData', (data) => {
            // TODO Verify data matches selected model
            this.socket.broadcast.emit('newData', data);
        });
    }
}

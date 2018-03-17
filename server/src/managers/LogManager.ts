import {Location} from '../interfaces/Location';
import {OpenFile} from '../interfaces/OpenFile';
import WriteStream = NodeJS.WriteStream;
import {ConfigManager} from './ConfigManager';
import Socket = SocketIO.Socket;
import {Recording} from "../interfaces/Recording";

export class LogManager {
    private LOG_PATH = './logs';
    private RECORDING_PATH = `${this.LOG_PATH}/recordings`;

    private socketRecordingMap: Map<Socket, Recording>;
    private logStream: WriteStream;

    constructor(private fs: any, private configManager: ConfigManager) {
        this.socketRecordingMap = new Map();
    }

    init() {
        if (!this.fs.existsSync(this.LOG_PATH)) {
            this.fs.mkdirSync(this.LOG_PATH);
        }

        if (!this.fs.existsSync(this.RECORDING_PATH)) {
            this.fs.mkdirSync(this.RECORDING_PATH);
        }

        const filename = this.getFormattedDate(new Date());
        this.logStream = this.fs.createWriteStream(`${this.LOG_PATH}/${filename}.csv`);

        this.logStream.write(this.configManager.getCSVTitle(), 'utf8', err => {
            if (err) {
                console.error(err);
            }
        });
    }

    logData(data: number[]): void {
        const csv = this.dataToCSV(data);
        this.logStream.write(csv, 'utf8', err => {
            if (err) {
                console.error('LogManager, logData:', err);
            }
        });

        this.socketRecordingMap.forEach(((recording, socket) => {
            recording.data.push(csv);
            this.socketRecordingMap.set(socket, recording);
        }));
    }

    logLocation(location: Location): void {

    }

    startRecording(socket: Socket): string {
        if (!this.socketRecordingMap.get(socket)) {
            this.socketRecordingMap.set(socket,
                {
                    filename: `${this.getFormattedDate(new Date())}.csv`,
                    data: [this.configManager.getCSVTitle()]
                }
            );

            return 'Recording successfully started!';
        }

        return 'Recording already in progress!';
    }

    stopRecording(socket: Socket, filename: string): Promise<boolean> {
        return new Promise(resolve => {
            const recording = this.socketRecordingMap.get(socket);
            if (recording) {
                if (!this.fs.existsSync(`${this.RECORDING_PATH}/${filename}`)) {
                    this.fs.writeFile(filename, recording.data, err => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
                this.fs.writeFile(filename, (writeErr) => {
                    if (writeErr) {
                        console.error('LogManager, stopRecording', writeErr);
                        resolve(false);
                    }
                    // this.resetRecordingData();
                    resolve(true);
                });
            }

            resolve(false);
        });
    }

    private recordedDataToCSV(array: number[][]): string {
        let csv = this.configManager.getCSVTitle();
        array.forEach((data: any[]) => {
            csv += this.dataToCSV(data);
        });

        return csv;
    }

    private dataToCSV(data: number[]): string {
        let csv = '';
        data.forEach((value, index) => {
            csv += value;
            if (index !== data.length - 1) {
                csv += ', ';
            }
        });

        return csv + '\n';
    }

    private getFormattedDate(date: Date): string {
        const time = date.toTimeString()
            .replace(/G.*$/, '')    // Gets rid of crap on the end
            .replace(' ', '')     // Gets rid of extra space left by previous replace
            .replace(/:/g, '-');      // Replaces colons with dashes

        return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}, ${time}`;
    }
}

import {Location} from '../interfaces/Location';
import {OpenFile} from '../interfaces/OpenFile';
import Socket = SocketIO.Socket;
import {Recording} from '../interfaces/Recording';
import {Response} from '../interfaces/Response';
import WriteStream = NodeJS.WriteStream;
import {ConfigManager} from './ConfigManager';

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
            recording.data += csv;
            this.socketRecordingMap.set(socket, recording);
        }));
    }

    logLocation(location: Location): void {

    }

    startRecording(socket: Socket): Response {
        if (!this.socketRecordingMap.get(socket)) {
            this.socketRecordingMap.set(socket,
                {
                    filename: `${this.getFormattedDate(new Date())}.csv`,
                    data: this.configManager.getCSVTitle()
                }
            );
            return {
                successful: true,
                message: 'Recording successfully started!'
            };
        }

        return {
            successful: false,
            message: 'Recording already in progress!'
        };
    }

    stopRecording(socket: Socket, filename: string): Promise<Response> {
        return new Promise(resolve => {
            const recording = this.socketRecordingMap.get(socket);
            console.log(recording);
            if (recording) {
                if (!this.fs.existsSync(`${this.RECORDING_PATH}/${filename}`)) {
                    this.fs.writeFile(`${this.RECORDING_PATH}/${filename}`, recording.data, (writeErr) => {
                        if (writeErr) {
                            console.error('LogManager, stopRecording', writeErr);
                            resolve({successful: false, message: 'Problem writing file!'});
                        }

                        this.socketRecordingMap.delete(socket);
                        resolve({successful: true, message: 'Recording saved as ' + filename});
                    });
                } else {
                    resolve({successful: false, message: 'File with that name already exists!'});
                }
            } else {
                resolve({successful: false, message: `How did you stop a recording you didn't start?`});
            }
        });
    }

    doesFileExist(filename: string): Promise<boolean> {
        return new Promise(resolve => {
            this.fs.exists(filename, exists => {
                resolve(exists);
            });
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

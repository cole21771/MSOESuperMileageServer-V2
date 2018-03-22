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

    private uuidRecordingMap: Map<string, Recording>;
    private logStream: WriteStream;

    constructor(private fs: any, private configManager: ConfigManager) {
        this.uuidRecordingMap = new Map();
    }

    init() {
        if (!this.fs.existsSync(this.LOG_PATH)) {
            this.fs.mkdirSync(this.LOG_PATH);
        }

        if (!this.fs.existsSync(this.RECORDING_PATH)) {
            this.fs.mkdirSync(this.RECORDING_PATH);
        }

        const filename = this.getFormattedDate();
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

        this.uuidRecordingMap.forEach(((recording, uuid) => {
            recording.data += csv;
            this.uuidRecordingMap.set(uuid, recording);
        }));
    }

    logLocation(location: Location): void {

    }

    startRecording(uuid: string): Response {
        if (this.uuidRecordingMap.get(uuid) === undefined) {
            this.uuidRecordingMap.set(uuid,
                {
                    filename: `${this.getFormattedDate()}.csv`,
                    data: this.configManager.getCSVTitle()
                }
            );
            return {
                error: false,
                message: 'Recording successfully started!'
            };
        } else {
            return {
                error: true,
                message: 'Recording already in progress!'
            };
        }
    }

    stopRecording(uuid: string, filename: string): Promise<Response> {
        return new Promise(resolve => {
            const recording = this.uuidRecordingMap.get(uuid);
            if (recording !== undefined) {
                if (!this.fs.existsSync(`${this.RECORDING_PATH}/${filename}`)) {
                    this.fs.writeFile(`${this.RECORDING_PATH}/${filename}`, recording.data, (writeErr) => {
                        if (writeErr) {
                            console.error('LogManager, stopRecording', writeErr);
                            resolve({error: true, message: 'Problem writing file!'});
                        }

                        this.uuidRecordingMap.delete(uuid);
                        resolve({error: false, message: 'Recording saved as ' + filename});
                    });
                } else {
                    resolve({error: true, message: 'File with that name already exists!'});
                }
            } else {
                resolve({error: true, message: `How did you stop a recording you didn't start?`});
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

    private getFormattedDate(date = new Date()): string {
        const time = date.toTimeString()
            .replace(/G.*$/, '')    // Gets rid of crap on the end
            .replace(' ', '')     // Gets rid of extra space left by previous replace
            .replace(/:/g, '-');      // Replaces colons with dashes

        return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}, ${time}`;
    }
}

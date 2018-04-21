import Socket = SocketIO.Socket;
import {Config} from '../../../client/src/app/models/interfaces/config/Config';
import {FullLog} from '../models/FullLog';
import {Recording} from '../models/interfaces/Recording';
import {Response} from '../models/interfaces/Response';
import WriteStream = NodeJS.WriteStream;
import {ConfigManager} from './ConfigManager';

export class LogManager {
    private LOG_PATH = './logs';
    private RECORDING_PATH = `${this.LOG_PATH}/recordings`;

    private uuidRecordingMap: Map<string, Recording>;
    private dataLogStream: WriteStream;
    private sessionLog: FullLog;

    constructor(private fs: any, private configManager: ConfigManager) {
        this.uuidRecordingMap = new Map();

        this.configManager.getConfig.then((res: Response<Config>) => {
            this.sessionLog = new FullLog(res.data);
        }).catch((errRes: Response<undefined>) => {
            throw new Error('Error retrieving config for session log!\n\n' + errRes.errorMessage);
        });

        if (!this.fs.existsSync(this.LOG_PATH)) {
            this.fs.mkdirSync(this.LOG_PATH);
        }

        if (!this.fs.existsSync(this.RECORDING_PATH)) {
            this.fs.mkdirSync(this.RECORDING_PATH);
        }

        const filename = this.getFormattedDate();
        setInterval(() => {
            if (this.sessionLog.hasBufferedData) {
                this.fs.writeFile(`${this.LOG_PATH}/${filename}.smv`, JSON.stringify(this.sessionLog), 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                this.sessionLog.resetBuffer();
                console.log('Writing session log');
            }
        }, 2000);
    }

    init(socket: Socket) {
        socket.on('get-logs', (undefined, callback) => {
            this.fs.readdir(this.LOG_PATH, 'utf8', (err, files) => {
                this.handleFileSystemError('LogManager, getLogs: ', err, callback);
                callback({error: false, data: files.map((filename) => ({path: this.LOG_PATH, filename}))});
            });
        });

        socket.on('get-recordings', (undefined, callback) => {
            this.fs.readdir(this.RECORDING_PATH, (err, files) => {
                this.handleFileSystemError('LogManager, getRecordings: ', err, callback);
                callback({error: false, data: files.map((filename) => ({path: this.RECORDING_PATH, filename}))});
            });
        });

        socket.on('get-file', (fileInfo, callback) => {
            this.fs.readFile(`${fileInfo.path}/${fileInfo.filename}`, (err, file) => {
                this.handleFileSystemError('LogManager, get-file:', err, () => {
                    callback({error: true, errorMessage: 'File Not Found!'});
                });
                callback({error: false, data: file.toString()});
            });
        });

        socket.on('startRecording', (uuid, callback) => {
            callback(this.startRecording(uuid));
        });

        socket.on('stopRecording', async (uuid, filename, callback) => {
            callback(await this.stopRecording(uuid, filename));
        });

        socket.on('doesRecordingExist', async (filename, callback) => {
            callback(await this.doesRecordingExist(filename));
        });
    }

    logData(data: number[]): void {
        this.sessionLog.addData(data);

        this.uuidRecordingMap.forEach((recording, uuid) => {
            recording.fullLog.addData(data);
            this.uuidRecordingMap.set(uuid, recording);
        });
    }

    logLocation(location: number[]): void {
        this.sessionLog.addLocation(location);

        this.uuidRecordingMap.forEach((recording, uuid) => {
            recording.fullLog.addLocation(location);
            this.uuidRecordingMap.set(uuid, recording);
        });
    }

    logMarker(marker: number[]): void {
        this.sessionLog.addMarker(marker);

        this.uuidRecordingMap.forEach((recording, uuid) => {
            recording.fullLog.addMarker(marker);
            this.uuidRecordingMap.set(uuid, recording);
        });
    }

    logError(error: any[]): void {
        this.sessionLog.addError(error);

        this.uuidRecordingMap.forEach((recording, uuid) => {
            recording.fullLog.addError(error);
            this.uuidRecordingMap.set(uuid, recording);
        });
    }

    startRecording(uuid: string): Response<string> {
        if (this.uuidRecordingMap.get(uuid) === undefined) {
            this.configManager.getConfig.then((res: Response<Config>) => {
                this.uuidRecordingMap.set(uuid, {
                    filename: `${this.getFormattedDate()}.csv`,
                    fullLog: new FullLog(res.data)
                });
                return {error: false, data: 'Recording successfully started!'};
            }).catch((errRes: Response<undefined>) => {
                console.error('LogManager, startRecording:', 'Error getting config', errRes.errorMessage);
                return {error: true, data: 'Problem getting config for starting recording!'};
            });
        } else {
            return {error: true, data: 'Recording already in progress!'};
        }
    }

    stopRecording(uuid: string, filename?: string): Promise<Response<string>> {
        return new Promise(resolve => {
            const recording = this.uuidRecordingMap.get(uuid);
            if (recording !== undefined) {
                if (filename) {
                    recording.filename = filename;
                }

                if (!this.fs.existsSync(`${this.RECORDING_PATH}/${recording.filename}`)) {
                    this.fs.writeFile(`${this.RECORDING_PATH}/${recording.filename}`, recording.fullLog, (writeErr) => {
                        this.handleFileSystemError('LogManager, stopRecording', writeErr, () => {
                            resolve({error: true, errorMessage: 'Problem writing file!'});
                        });

                        this.uuidRecordingMap.delete(uuid);
                        resolve({error: false, data: 'Recording saved as ' + recording.filename});
                    });
                } else {
                    resolve({error: true, errorMessage: 'File with that name already exists!'});
                }
            } else {
                resolve({error: true, errorMessage: `How did you stop a recording you didn't start?`});
            }
        });
    }

    doesRecordingExist(filename: string): Promise<boolean> {
        return new Promise(resolve => {
            resolve(this.fs.existsSync(`${this.RECORDING_PATH}/${filename}`));
        });
    }

   /* private dataToCSV(fullLog: number[]): string {
        let csv = '';
        fullLog.forEach((value, index) => {
            csv += value;
            if (index !== fullLog.length - 1) {
                csv += ', ';
            }
        });

        return csv + '\n';
    }*/

    private getFormattedDate(date = new Date()): string {
        const time = date.toTimeString()
            .replace(/G.*$/, '')    // Gets rid of crap on the end
            .replace(' ', '')     // Gets rid of extra space left by previous replace
            .replace(/:/g, '-');      // Replaces colons with dashes

        return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}, ${time}`;
    }

    private handleFileSystemError(location: string, err: string, callback) {
        if (err) {
            console.error(location, err);
            callback({error: true, errorMessage: location + err});
        }
    }
}

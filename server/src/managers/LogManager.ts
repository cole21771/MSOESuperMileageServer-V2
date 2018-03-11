import {Location} from '../interfaces/Location';
import {OpenFile} from '../interfaces/OpenFile';
import WriteStream = NodeJS.WriteStream;
import {ConfigManager} from './ConfigManager';

export class LogManager {
    private LOG_PATH = './logs';
    private RECORDING_PATH = `${this.LOG_PATH}/recordings`;

    private recordedData: number[][];
    private openFile: OpenFile;
    private logStream: WriteStream;

    constructor(private fs: any, private configManager: ConfigManager) {
        this.recordedData = [];
    }

    init(): void {
        if (!this.fs.existsSync(this.LOG_PATH)) {
            this.fs.mkdirSync(this.LOG_PATH);
        }

        if (!this.fs.existsSync(this.RECORDING_PATH)) {
            this.fs.mkdirSync(this.RECORDING_PATH);
        }

        const filename = new Date().toString().replace(/:/g, '-').replace(/ *\([^)]*\) */g, '');
        this.logStream = this.fs.createWriteStream(`${this.LOG_PATH}/${filename}.log`);

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

        if (this.openFile) {
            this.recordedData.push(data);
        }
    }

    logLocation(location: Location): void {

    }

    startRecording(filename: string): Promise<boolean> {
        return new Promise(resolve => {
            const filePath = `${this.RECORDING_PATH}/${filename}`;

            this.fs.open(filePath, 'wx', (err, fd) => {
                if (err) {
                    console.error('LogManager, startRecording: ', err);
                }

                this.openFile = {
                    path: filePath,
                    descriptor: fd
                };

                resolve(!err);
            });
        });
    }

    stopRecording(): Promise<boolean> {
        return new Promise(resolve => {
            if (this.openFile) {
                this.fs.writeFile(this.openFile.path, this.recordedDataToCSV(this.recordedData), (writeErr) => {
                    if (writeErr) {
                        console.error('LogManager, stopRecording', writeErr);
                        resolve(false);
                    }

                    this.fs.close(this.openFile.descriptor, closeErr => {
                        if (writeErr) {
                            console.error('LogManager, stopRecording:', closeErr);
                        }
                    });
                    this.resetRecordingData();
                    resolve(true);
                });
            }

            resolve(false);
        });
    }

    private resetRecordingData(): void {
        this.openFile = undefined;
        this.recordedData = [];
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
}

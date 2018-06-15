import * as Agenda from 'agenda';

export class AgendaService {
    private static _agenda: Agenda;
    private static _started = false;

    static init() {
        this._agenda = new Agenda({
            db: {
                address: 'mongodb://127.0.0.1/mundial',
                collection: 'agendas'
            }
        }).processEvery('1 second');

        this._agenda.on('ready', () => {
            if (this._started) return;

            this._started = true;
            this._agenda.start();
            console.log('Agenda started');

            require('../tasks/import-teams.task');
            require('../tasks/import-matches.task');
        });
    }

    static async schedule(date: Date|string, jobName: string, data?: any): Promise<void> {
        this._agenda.schedule(date, jobName, data, (err) => {
            if (err) {
                console.error(err.name + ': ' + err.message);
            } else {
                console.log(`Job '${jobName}' completed!`);
            }
        });
    }

    static async every(cron: string, jobName: string, data?: any): Promise<void> {
        this._agenda.every(cron, jobName, data, err => {
            if (err) {
                console.error(err.name + ': ' + err.message);
            } else {
                console.log(`Job '${jobName}' completed!`);
            }
        });
    }

    static define(jobName: string, callback: (job: any, done: (err?) => void) => void): void {
        this._agenda.define(jobName, callback);
    }
}

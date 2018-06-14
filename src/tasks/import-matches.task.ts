import * as request from 'request-promise-native';

import { AgendaService } from '../services/agenda.service';
import { Match } from '../models/match.model';

const JSON_URL = 'https://rawgit.com/openfootball/world-cup.json/master/2018/worldcup.json';

AgendaService.define('import matches', async job => {
    try {
        const rawData = await request.get(JSON_URL);
        const data = JSON.parse(rawData);
    } catch (err) {
        console.log('Import matches error: ' + err);
    }
});

AgendaService.every('2 seconds', 'import matches');

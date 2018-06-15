import * as request from 'request-promise-native';

import { AgendaService } from '../services/agenda.service';
import { Team } from '../models/team.model';

const JSON_URL = 'https://rawgit.com/openfootball/world-cup.json/master/2018/worldcup.teams.json';

AgendaService.define('import teams', async job => {
    try {
        const rawData = await request.get(JSON_URL);
        const data = JSON.parse(rawData);

        await Promise.all(data.teams.map(async team => {
            const oldTeam = await Team.findOne({
                code: team.code
            });

            if (oldTeam) return;

            await new Team({
                name: team.name,
                code: team.code,
                color: '#ff0000',
                continent: team.continent
            }).save();
        }));
    } catch (err) {
        console.log('Import teams error: ' + err);
    }
});

AgendaService.every('2 hours', 'import teams');

import * as request from 'request-promise-native';
import * as moment from 'moment-timezone';

import { AgendaService } from '../services/agenda.service';
import { Team } from '../models/team.model';
import { Match } from '../models/match.model';

const JSON_URL = 'https://rawgit.com/openfootball/world-cup.json/master/2018/worldcup.json';

AgendaService.define('import matches', async job => {
    try {
        const rawData = await request.get(JSON_URL);
        const data = JSON.parse(rawData);

        await Promise.all(data.rounds.map(async matchDay => {
            await Promise.all(matchDay.matches.map(async match => {
                const oldMatch = await Match.findOne({
                    num: match.num
                });

                if (oldMatch) {
                    await Match.findOneAndUpdate({
                        num: match.num
                    }, {
                        score1: match.score1,
                        score2: match.score2
                    });
                } else {
                    const team1 = await Team.findOne({
                        code: match.team1.code
                    });

                    const team2 = await Team.findOne({
                        code: match.team2.code
                    });

                    const tz = Number(match.timezone.replace('UTC', ''));

                    await new Match({
                        num: match.num,
                        date: moment(`${match.date}T${match.time}`).subtract(tz, 'h').toDate(),
                        team1: (team1 as any)._id,
                        team2: (team2 as any)._id,
                        
                        group: match.group,
                        stadium: match.stadium.name,
                        matchDay: matchDay.name
                    }).save();
                }
            }));
        }));

        console.log('import match done');
    } catch (err) {
        console.log('Import matches error: ' + err);
    }
});

// AgendaService.every('2 seconds', 'import matches');
AgendaService.schedule('in 2 seconds', 'import matches');

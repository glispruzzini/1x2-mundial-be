import { model, Schema } from 'mongoose';

import { IMatch, IMatchModel } from '../interfaces/match.interface';
import { ITeam } from '../interfaces/team.interface';

export class MatchSchema extends Schema implements IMatch {
    num: number;
    date: Date;
    team1: ITeam;
    team2: ITeam;

    score1: number;
    score2: number;

    group: string;
    stadium: string;
    matchDay: string;

    constructor() {
        super({
            num: Number,
            date: Date,

            team1: {
                type: Schema.Types.ObjectId,
                ref: 'Team'
            },
            team2: {
                type: Schema.Types.ObjectId,
                ref: 'Team'
            },

            score1: Number,
            score2: Number,

            group: String,
            stadium: String,
            matchDay: String
        });
    }
}

export const Match = model<IMatchModel>('Match', new MatchSchema());

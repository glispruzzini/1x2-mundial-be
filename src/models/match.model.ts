import { model, Schema } from 'mongoose';

import { IMatch, IMatchModel } from '../interfaces/match.interface';
import { ITeam } from '../interfaces/team.interface';

export class MatchSchema extends Schema implements IMatch {
    date: Date;
    team1: ITeam;
    team2: ITeam;

    score1: number;
    score2: number;

    group: string;
    stadium: string;

    constructor() {
        super({
            date: Date,

            team1: {
                schema: Schema.Types.ObjectId,
                ref: 'Team'
            },
            team2: {
                schema: Schema.Types.ObjectId,
                ref: 'Team'
            },

            score1: Number,
            score2: Number,

            group: String,
            stadium: String
        });
    }
}

export const Match = model<IMatchModel>('Match', new MatchSchema());

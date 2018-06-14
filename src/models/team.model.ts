import { model, Schema } from 'mongoose';

import { ITeam, ITeamModel } from '../interfaces/team.interface';

export class TeamSchema extends Schema implements ITeam {
    name: string;
    code: string;
    color: string;
    continent: string;

    constructor() {
        super({
            name: String,
            code: String,
            color: String,
            continent: String
        });
    }
}

export const Team = model<ITeamModel>('Team', new TeamSchema());

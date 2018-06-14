import { model, Schema } from 'mongoose';

import { ITeam, ITeamModel } from '../interfaces/team.interface';

export class TeamSchema extends Schema implements ITeam {
    name: string;
    color: string;
    continent: string;

    constructor() {
        super({
            name: String,
            color: String,
            continent: String
        });
    }
}

export const Team = model<ITeamModel>('Team', new TeamSchema());

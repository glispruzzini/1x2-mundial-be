import { model, Schema, Types } from 'mongoose';

import { IBet, IBetModel, BetResults } from "../interfaces/bet.interface";
import { IMatch } from "../interfaces/match.interface";

export class BetModel extends Schema implements IBet {
    user: string;
    match: IMatch;
    result: BetResults;

    constructor() {
        super({
            user: String,
            match: {
                type: Schema.Types.ObjectId,
                ref: 'Team'
            },
            result: String
        });
    }
}

export const Bet = model<IBetModel>('Bet', new BetModel());

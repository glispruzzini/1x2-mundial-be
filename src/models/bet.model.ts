import { model, Schema, Types } from 'mongoose';

import { IBet, IBetModel, BetResults } from "../interfaces/bet.interface";

export class BetModel extends Schema implements IBet {
    user: string;
    match: Types.ObjectId;
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

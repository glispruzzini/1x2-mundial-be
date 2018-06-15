import { Document, Types } from 'mongoose';

export enum BetResults {
    HOME = "1",
    NEUTRAL = "X",
    AWAY = "2"
}

export interface IBet {
    user: {
        required: true,
        type: string
    };
    match: {
        required: true,
        type: Types.ObjectId
    }
    result: {
        required: true,
        type: BetResults
    }
}

export interface IBetModel extends IBet, Document {} 

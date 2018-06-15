import { Document, Types } from 'mongoose';
import { IMatch } from './match.interface';

export enum BetResults {
    HOME = "1",
    NEUTRAL = "X",
    AWAY = "2"
}

export interface IBet {
    user: string;
    match: IMatch
    result: BetResults
}

export interface IBetModel extends IBet, Document {} 

import { Document } from 'mongoose';
import { ITeam } from './team.interface';

export interface IMatch {
    num: number;
    date: Date;
    team1: ITeam;
    team2: ITeam;

    score1: number;
    score2: number;

    group: string;
    matchDay: string;
    stadium: string;
}

export interface IMatchModel extends IMatch, Document {}

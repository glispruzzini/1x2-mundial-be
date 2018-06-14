import { Document } from 'mongoose';

export interface ITeam {
    name: string;
    color: string;
    continent: string;
}

export interface ITeamModel extends ITeam, Document {} 

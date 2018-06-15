import { Document } from 'mongoose';

export interface IUser {
    token: string;
    life: number;
    points: number;
}

export interface IUserModel extends IUser, Document {}

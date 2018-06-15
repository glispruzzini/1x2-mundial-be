import { Document } from 'mongoose';

export interface IUser {
    uid: string;
    life: number;
    points: number;
}

export interface IUserModel extends IUser, Document {}

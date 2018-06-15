import { Document } from 'mongoose';

export interface ILife {
    user: string;
    life: number;
}

export interface ILifeModel extends ILife, Document {}

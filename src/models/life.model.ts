import { model, Schema } from 'mongoose';

import { ILife, ILifeModel } from '../interfaces/life.interface';

export class LifeSchema extends Schema implements ILife {
    user: string;
    life: number;

    constructor() {
        super({
            user: String,
            life: {
                type: Number,
                default: 5
            }
        });
    }
}

export const Life = model<ILifeModel>('Life', new LifeSchema());

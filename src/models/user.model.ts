import { model, Schema } from 'mongoose';

import { IUser, IUserModel } from '../interfaces/user.interface';

export class UserSchema extends Schema implements IUser {
    token: string;
    life: number;
    points: number;

    constructor() {
        super({
            user: String,
            life: {
                type: Number,
                default: 5
            },
            points: {
                type: Number,
                default: 0
            }
        });
    }
}

export const User = model<IUserModel>('User', new UserSchema());

import { Life } from '../models/life.model';
import { ILife, ILifeModel } from '../interfaces/life.interface';

export class LifeService {
    static async get(user: string): Promise<number> {
        const userLife: ILife = await Life.findOne({ user });
        if (!userLife) throw new Error('User not found');
        return userLife.life;
    }

    static async subtract(user: string, val: number): Promise<number> {
        const userLife: ILifeModel = await Life.findOne({ user });
        if (!userLife) throw new Error('User not found');

        userLife.life = Math.max(0, userLife.life - val);
        await userLife.save();

        return userLife.life;
    }

    static async add(user: string, val: number): Promise<number> {
        const userLife: ILifeModel = await Life.findOne({ user });
        if (!userLife) throw new Error('User not found');

        userLife.life = Math.min(5, userLife.life + val);
        await userLife.save();

        return userLife.life;
    }

    static async addNewUser(user: string, val?: number): Promise<ILife> {
        return await new Life({
            user,
            life: val || 5
        }).save();
    }

    static async getUser(user: string): Promise<ILife> {
        return await Life.findOne({ user });
    }
}

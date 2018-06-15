import { User } from '../models/user.model';
import { IUser, IUserModel } from '../interfaces/user.interface';
import { IMatchModel, IMatch } from '../interfaces/match.interface';

const BASE_POINTS = 100;

export class UserService {
    static async getLife(user: string): Promise<number> {
        const userLife: IUser = await User.findOne({ user });
        if (!userLife) throw new Error('User not found');
        return userLife.life;
    }

    static async subtractLife(token: string, val: number): Promise<number> {
        const user: IUserModel = await User.findOne({ token });
        if (!user) throw new Error('User not found');

        user.life = Math.max(0, user.life - val);
        await user.save();

        return user.life;
    }

    static async addLife(token: string, val: number): Promise<number> {
        const user: IUserModel = await User.findOne({ token });
        if (!user) throw new Error('User not found');

        user.life = Math.min(5, user.life + val);
        await user.save();

        return user.life;
    }

    static async addPoints(token: string, match: IMatchModel): Promise<number> {
        const user: IUserModel = await User.findOne({ token });
        
        user.points += BASE_POINTS;

        // TODO: add matchDay bonus
        // TODO: add multiplier

        await user.save();

        return user.points;
    }

    static async addNewUser(token: string, life?: number, points?: number): Promise<IUser> {
        return await new User({
            token,
            life: life || 5,
            points: points || 0
        }).save();
    }

    static async getUser(token: string): Promise<IUser> {
        return await User.findOne({ token });
    }
}

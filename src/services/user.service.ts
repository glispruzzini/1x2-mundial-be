import { User } from '../models/user.model';
import { IUser, IUserModel } from '../interfaces/user.interface';
import { IMatchModel, IMatch } from '../interfaces/match.interface';
import { Bet } from '../models/bet.model';

const BASE_POINTS = 100;

export class UserService {
    static async getLife(uid: string): Promise<number> {
        const user: IUser = await User.findOne({ uid });
        if (!user) throw new Error('User not found');
        return user.life;
    }

    static async subtractLife(uid: string, val: number): Promise<number> {
        const user: IUserModel = await User.findOne({ uid });
        if (!user) throw new Error('User not found');

        user.life = Math.max(0, user.life - val);
        await user.save();

        return user.life;
    }

    static async addLife(uid: string, val: number): Promise<number> {
        const user: IUserModel = await User.findOne({ uid });
        if (!user) throw new Error('User not found');

        user.life = Math.min(5, user.life + val);
        await user.save();

        return user.life;
    }

    static async addPoints(uid: string, match: IMatchModel): Promise<number> {
        const user: IUserModel = await User.findOne({ uid });
        
        // user.points += BASE_POINTS;

        const bets = await Bet.aggregate([{
            $match: {
                match: match._id
            }
        }, {
            $groupBy: {
                _id: '$result',
                count: {
                    $sum: 1
                }
            }
        }]);

        console.log(bets);

        // TODO: add matchDay bonus
        // TODO: add multiplier

        await user.save();
        return user.points;
    }

    static async addNewUser(uid: string, life?: number, points?: number): Promise<IUserModel> {
        return await new User({
            uid,
            life: life || 5,
            points: points || 0
        });
    }

    static async getUser(uid: string): Promise<IUser> {
        return await User.findOne({ uid });
    }
}

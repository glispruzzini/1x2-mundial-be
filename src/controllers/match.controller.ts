import { Response } from "express";
import * as moment from "moment";

import { AuthoredRequest } from "../interfaces/customExpress.interface";
import { Match } from "../models/match.model";
import { IBetModel } from "../interfaces/bet.interface";
import { Bet } from "../models/bet.model";
import { IMatchModel } from "../interfaces/match.interface";

export class MatchController {
    public getTodaysMatches(req: AuthoredRequest, res: Response) {
        const today = moment().startOf('day')
        const tomorrow = moment(today).endOf('day')
        Match
            .find({
                date: {
                    $gte: today.toDate(),
                    $lt: tomorrow.toDate()
                }
            })
            .populate('team1 team2')
            .exec()
            .then(async (matches) => {
                let filteredMatches: IMatchModel[] = matches.filter(match => {
                    const currentTime = moment();
                    const matchTime = moment(match.date);

                    const safeTime = moment(matchTime).set({
                        hour : matchTime.get('hour') - 1,
                        minute  : matchTime.get('minute'), 
                        second : matchTime.get('second')
                    })

                    return currentTime.isBefore(safeTime);
                });

                for (const match of filteredMatches) {
                    const bet: IBetModel = await Bet.findOne({
                        match: match._id,
                        user: req.user._id
                    });

                    if (bet) (match as any).bet = bet;
                }

                return res.send(filteredMatches);
            })
            .catch((err) => {
                console.log(err);
                return res.sendStatus(500);
            });
    }
}

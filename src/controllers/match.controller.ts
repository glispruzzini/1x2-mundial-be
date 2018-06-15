import { Response } from "express";
import * as moment from "moment";

import { AuthoredRequest } from "../interfaces/customExpress.interface";
import { Match } from "../models/match.model";

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
            .then((matches) => {
                let filteredMatches = matches.filter(match => {
                    const currentTime = moment();
                    const matchTime = moment(match.date);

                    const safeTime = moment(matchTime).set({
                        hour : matchTime.get('hour') - 1,
                        minute  : matchTime.get('minute'), 
                        second : matchTime.get('second')
                    })

                    return currentTime.isBefore(safeTime);
                });
                return res.send(filteredMatches);
            })
            .catch((err) => {
                console.log(err);
                return res.sendStatus(500);
            });
    }
}

import { Response } from "express";

import { AuthoredRequest } from "../interfaces/customExpress.interface";
import { Bet } from "../models/bet.model";

export class BetController {
    public addBet (req: AuthoredRequest, res: Response) {
        let tempBet = new Bet({
            user: req.user.uid,
            match: req.body.match,
            result: req.body.result
        });

        tempBet.save((err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            res.sendStatus(200);
        })
    }
}

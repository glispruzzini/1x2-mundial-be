import { Response } from "express";

import { AuthoredRequest } from "../interfaces/customExpress.interface";
import { Bet } from "../models/bet.model";
import { ApiError } from "../interfaces/api-error.interface";

import { LifeService } from "../services/life.service";

export class BetController {
    public addBet (req: AuthoredRequest, res: Response) {
        if (!req.user || !req.user.uid) {
            return res.status(400).send({
                error: ApiError.MISSING_OR_INVALID_TOKEN
            }); 
        }
        let tempBet = new Bet({
            user: req.user.uid,
            match: req.body.match,
            result: req.body.result
        });

        return LifeService
            .get(req.user.uid)
            .then(life => {
                if (life < 1) {
                    return res.status(400).send({
                        error: ApiError.NO_MORE_LIFE
                    });
                }

                tempBet.save((err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    }
        
                    return res.sendStatus(200);
                })
            });
    }
}

import { Response } from "express";

import { AuthoredRequest } from "../interfaces/customExpress.interface";
import { Bet } from "../models/bet.model";
import { ApiError } from "../interfaces/api-error.interface";

import { UserService } from "../services/user.service";

export class BetController {
    public addBet (req: AuthoredRequest, res: Response) {
        if (!req.user || !req.user.uid) {
            return res.status(400).send({
                error: ApiError.MISSING_OR_INVALID_TOKEN
            }); 
        }

        Bet
            .findOne({
                $and: [{
                    user: req.user.uid
                }, {
                    match: req.body.match
                }]
            })
            .exec()
            .then(olderBet => {
                if (olderBet) {
                    return res.status(409).send(ApiError.BET_ALREADY_PLACED)
                }

                let tempBet = new Bet({
                    user: req.user.uid,
                    match: req.body.match,
                    result: req.body.result
                });
        
                return UserService
                    .getLife(req.user.uid)
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
                
                            return res.send({
                                status: true
                            });
                        })
                    });
            })
            .catch(err => {
                console.error(err);
                res.sendStatus(500);
            })
    }

    public async getBets(req: AuthoredRequest, res: Response) {
        if (!req.user || !req.user.uid) {
            return res.status(400).send({
                error: ApiError.MISSING_OR_INVALID_TOKEN
            }); 
        }

        const bets = await Bet.find({
            user: req.user._id
        }).populate('team1 team2');

        res.send(bets);
    }
}

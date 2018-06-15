import { Response } from "express";

import * as mongoose from 'mongoose';

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
        
                    return res.sendStatus(200);
                })
            });
    }

    // TODO: remove in prod
    public async addTestBet(req, res) {
        await new Bet({
            user: 'abcde12345',
            match: mongoose.Types.ObjectId,
            result: ['1', 'X', '2'][Math.floor(Math.random() * 3)]
        });
        
        res.send({ status: 'ok' });
    }
}

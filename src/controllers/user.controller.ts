import { Request, Response } from "express";

import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { ApiError } from "../interfaces/api-error.interface";

import { auth } from 'firebase-admin';

import { verifyToken } from "../services/firebaseAdmin";

export class UserController {
    public createUser (req: Request, res: Response) {
        return verifyToken(req.body.token)
            .then((decodedToken: auth.DecodedIdToken) => {
                return UserService.addNewUser(decodedToken.uid).then(userModel => {
                    userModel.save(err => {
                        if (err) {
                            console.log(err);
                            return res.sendStatus(500);
                        }
                        return res.sendStatus(200);
                    })
                })
            })
            .catch(() => {
                return res.sendStatus(500);
            });
    }

    // TODO: remove in prod
    public async createTestUser(req, res) {
        await (await UserService.addNewUser('abcde12345')).save();
        res.send({ status: 'ok' });
    }
}

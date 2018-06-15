import { Request, Response } from "express";

import { User } from "../models/user.model";
import { ApiError } from "../interfaces/api-error.interface";

import { auth } from 'firebase-admin';

import { verifyToken } from "../services/firebaseAdmin";

export class UserController {
    public createUser (req: Request, res: Response) {
        verifyToken(req.body.token)
            .then((decodedToken: auth.DecodedIdToken) => {
                let tempUser = new User({
                    uid: decodedToken.uid
                });

                tempUser.save(err => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    }
        
                    res.sendStatus(200);
                })
            })
            .catch(() => {
                return res.sendStatus(500);
            });
    }
}

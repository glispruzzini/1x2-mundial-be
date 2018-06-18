import { Request, Response } from "express";

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
                            if (err.code === 11000) {
                                return res.status(409).send(ApiError.USER_ALREADY_CREATED);
                            }
                            console.log(err);
                            return res.sendStatus(500);
                        }
                        return res.send({
                            status: true
                        });
                    })
                })
            })
            .catch((err) => {
                console.log(err);
                return res.sendStatus(500);
            });
    }
}

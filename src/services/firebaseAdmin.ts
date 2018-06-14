import { Response, NextFunction } from "express";
import { AuthoredRequest } from "../interfaces/customExpress";
import * as admin from 'firebase-admin';

const credentials = require("../../secret-secretante.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

export function firebaseAuthMiddleware(req: AuthoredRequest, res: Response, next: NextFunction) {
    return admin
        .auth()
        .verifyIdToken(req.header('Authorization'))
        .then(function(decodedToken) {
            req.user = decodedToken;
            next();
        }).catch(function(error) {
            res.status(401);
        });
}
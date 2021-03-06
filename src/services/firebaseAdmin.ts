import { Response, NextFunction } from "express";
import { AuthoredRequest } from "../interfaces/customExpress.interface";
import * as admin from 'firebase-admin';

const credentials = require("../../secret-secretante.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

export function verifyToken(token) {
    return admin.auth().verifyIdToken(token);
}

export function firebaseAuthMiddleware(req: AuthoredRequest, res: Response, next: NextFunction) {
    return verifyToken(req.header('Authorization'))
        .then((decodedToken: admin.auth.DecodedIdToken) => {
            req.user = decodedToken;
            return next();
        })
        .catch(() => {
            return res.sendStatus(401);
        });
}
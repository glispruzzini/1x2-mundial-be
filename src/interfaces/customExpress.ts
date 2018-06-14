import { Request } from "express";
import { auth } from "firebase-admin";
export interface AuthoredRequest extends Request {
    user?: auth.DecodedIdToken;
}
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";

import routing from "./router";
import { firebaseAuthMiddleware } from "./services/firebaseAdmin";

export class Server {
    public static bootstrap(): Server {
        return new Server();
    }
    public app: express.Application;
    constructor() {
        this.app = express();

        this.config();

        this.routes();
    }
    public config() {
        this.app.use(cors());

        this.app.use(bodyParser.json());
    }
    public routes() {
        this.app.use("/", routing);
        this.app.use("/security", firebaseAuthMiddleware, routing);
        this.app.listen(3082, () => {
            // tslint:disable-next-line:no-console
            console.log("Running");
        });
    }
}

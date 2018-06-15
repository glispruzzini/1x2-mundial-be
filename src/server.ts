import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as minimist from 'minimist';

import routing from "./router";
import secureRouting from "./securityRouter";
import { firebaseAuthMiddleware } from "./services/firebaseAdmin";
import { AgendaService } from './services/agenda.service';

export class Server {
    private _port: number;
    
    public static bootstrap(): Server {
        return new Server();
    }

    public app: express.Application;

    constructor() {
        this.app = express();

        const argv = minimist(process.argv.slice(2));
        this._port = Number(argv.port) || 3082;

        this.config();
        this.routes();

        AgendaService.init();
    }

    public config() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use('/assets', express.static('./assets'));

        this.app.get('/', (req, res) => {
            res.send(`
<!DOCTYPE html>
<html style="height: 100%">
<head>

</head>
<body style="background: url('/assets/img.jpg'); background-size: 100% 100%; height: 100%">
    
</body>
</html>
            `);
        });
    }

    public routes() {
        this.app.use("/public", routing);
        // this.app.use("/security", firebaseAuthMiddleware, routing);
        this.app.use("/security", firebaseAuthMiddleware, secureRouting);
        this.app.listen(this._port, () => {
            // tslint:disable-next-line:no-console
            console.log(`Running on port ${this._port}`);
        });
    }
}

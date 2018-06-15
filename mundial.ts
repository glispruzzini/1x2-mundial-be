process.env.TZ = 'UTC';

import { DB } from "./src/database";
import { Server } from "./src/server";

DB.on("open", () => {
    // tslint:disable-next-line:no-console
    console.info("Connected to database");
});

const app = Server.bootstrap().app;
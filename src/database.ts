import { connect, connection } from "mongoose";

connection.on("error", () => {
    // tslint:disable-next-line:no-console
    console.error("DATABASE CONNECTION ERROR!");
});

try {
    connect("mongodb://127.0.0.1/mundial");
} catch (err) {
    // tslint:disable-next-line:no-console
    console.error("DATABASE CONNECTION ERROR!");
}

export const DB = connection;

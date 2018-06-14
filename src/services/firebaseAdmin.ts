import * as admin from 'firebase-admin';

const test = require("../../secret-secretante.json");

admin.initializeApp({
    credential: admin.credential.cert(test)
});


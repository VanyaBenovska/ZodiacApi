var admin = require("firebase-admin");

var serviceAccount = require("../../database.json");

export const database = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

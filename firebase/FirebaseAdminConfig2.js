var admin = require("firebase-admin");

var serviceAccount = require("./privatekeys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore()

export {firestore}
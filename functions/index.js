import functions from "firebase-functions";
import admin from "firebase-admin";

// initializes your application
admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.firestore
  .document("info")
  .onCreate(event => {

    // gets standard JavaScript object from the new write
    const writeData = event.data.data();

    // the payload is what will be delivered to the device(s)
    let payload = {
      notification: {
      title: "Agora İstanbul",
      body: "A news has been published",
      sound: "",
     }
    }

     return admin.messaging().sendToDevice("", payload);
});

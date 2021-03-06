import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.firestore
  .document("info/{infoID}")
  .onCreate((context) => {

    const data = context.data();

    if(data.type=="news"){

      const message = {
        notification: {
          title: data.title,
          body: data.text
        },
        android: {
          notification: {
            sound: "default"
          }
        },
        topic:"all"
      }

      admin.messaging().send(message)
        .then((response) => {
          // Response is a message ID string.
          console.log('Successfully sent message:', response);
        })
        .catch((error) => {
          console.log('Error sending message:', error);
        });

    }

});

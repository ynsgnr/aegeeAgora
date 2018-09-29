
//This file is about event branch for databaase operations

//Always return a promise and always resolve with an array

import firebase from 'react-native-firebase'

export function getStart(){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('settings').doc("barcodeStart").get().then((snapshot)=>{
      resolve(snapshot.data().start)
    })
  })
}

export function doSomethingWithBarcode(barcodeNum){
  return new Promise(function(resolve,reject){
      console.log(barcodeNum);
    }
  )
}

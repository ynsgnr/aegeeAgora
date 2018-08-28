
//This file is about event branch for databaase operations

//Always return a promise and always resolve with an array

import firebase from 'react-native-firebase'

export function getAllEvents(){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('events').where("valid","==",true).get().then((qsnapshot)=>{
      let dataArray=[]
      qsnapshot.forEach((doc)=>dataArray.push(doc.data()))
      resolve(dataArray)
    })
  })
}


export function getEventByKey(key){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('events').doc(key.toString()).get().then((snapshot)=>{
      resolve(snapshot.data())
    })
  })
}

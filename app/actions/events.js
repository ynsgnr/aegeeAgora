
//This file is about event branch for databaase operations

//Always return a promise and always resolve with an array

import firebase from 'react-native-firebase'

export function getAllEvents(){
  return new Promise(function(resolve,reject){
    //Get object here
    firebase.database().ref('events/').once('value').then((snapshot)=>{
      resolve(snapshot.val())
    })
  })
}


export function getEventByKey(key){
  return new Promise(function(resolve,reject){
    //Get object here
    firebase.database().ref('events/'+key).once('value').then((snapshot)=>{
      resolve(snapshot.val())
    })
  })
}

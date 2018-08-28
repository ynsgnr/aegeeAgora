
//This file is about location branch for databaase operations

//Always return a promise and always resolve with an array

import firebase from 'react-native-firebase'

export function getAllLocations(){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('locations').where("valid","==",true).get().then((qsnapshot)=>{
      let dataArray=[]
      qsnapshot.forEach((doc)=>dataArray.push(doc.data()))
      resolve(dataArray)
    })
  })
}

export function getTypes(){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('settings').doc("locationTypes").get().then((snapshot)=>{
      resolve(snapshot.data())
    })
  })
}

export function getInitalRegion(){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('settings').doc("initRegion").get().then((snapshot)=>{
      resolve(snapshot.data())
    })
  })
}

export function getLocationByKey(key){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('locations').doc(key.toString()).get().then((snapshot)=>{
      resolve(snapshot.data())
    })
  })
}

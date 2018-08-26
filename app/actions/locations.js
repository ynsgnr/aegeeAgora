
//This file is about location branch for databaase operations

//Always return a promise and always resolve with an array

import firebase from 'react-native-firebase'

export function getAllLocations(){
  return new Promise(function(resolve,reject){
    firebase.database().ref('locations/').once('value').then((snapshot)=>{
      resolve(snapshot.val())
    })
  })
}

export function getTypes(){
  return new Promise(function(resolve,reject){
    firebase.database().ref('locationTypes/').once('value').then((snapshot)=>{
      resolve(snapshot.val())
    })
  })
}

export function getInitalRegion(){
  return new Promise(function(resolve,reject){
    firebase.database().ref('initRegion/').once('value').then((snapshot)=>{
      resolve(snapshot.val())
    })
  })
}

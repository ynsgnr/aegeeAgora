
//This file is about info branch for databaase operations

//Always return a promise and always resolve with an array

import firebase from 'react-native-firebase'

export function getAllInfo(){
  return new Promise(function(resolve,reject){
    firebase.database().ref('info/').once('value').then((snapshot)=>{
      resolve(snapshot.val())
    })
  })
}

export function getAllNews(){
  return new Promise(function(resolve,reject){
    getAllInfo().then((value)=>{
      let result=[]
      value.map((item)=>{
        if(item.type=='news')
          result.push(item)
      })
      resolve(result)
    })
  })
}

export function getTypes(){
  return new Promise(function(resolve,reject){
    firebase.database().ref('infoTypes/').once('value').then((snapshot)=>{
      resolve(snapshot.val())
    })
  })
}

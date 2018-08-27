
//This file is about info branch for databaase operations

//Always return a promise and always resolve with an array

import firebase from 'react-native-firebase'

export function getAllInfo(){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('info').where("valid","==",true).get().then((qsnapshot)=>{
      let dataArray=[]
      qsnapshot.forEach((doc)=>dataArray.push(doc.data()))
      resolve(dataArray)
    })
  })
}

export function getAllNews(){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('info').where("valid","==",true).where("type","==","news").get().then((qsnapshot)=>{
      let dataArray=[]
      qsnapshot.forEach((doc)=>dataArray.push(doc.data()))
      resolve(dataArray)
    })
  })
}

export function getTypes(){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('settings').doc("infoTypes").get().then((snapshot)=>{
      resolve(snapshot.data())
    })
  })
}

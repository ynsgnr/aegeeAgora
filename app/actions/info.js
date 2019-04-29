
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

export function getNewsByEvent(event){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('info').where("eventKey","==",event).where("type","==","news").get().then((qsnapshot)=>{
      let dataArray=[]
      qsnapshot.forEach((doc)=>dataArray.push(doc.data()))
      resolve(dataArray)
    })
  })
}

export function getNewsByLocation(location){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('info').where("locationKey","==",location).where("type","==","news").get().then((qsnapshot)=>{
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

export function getInfoByKey(key){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('info').doc(key.toString()).get().then((snapshot)=>{
      resolve(snapshot.data())
    })
  })
}

export function writeInfo(info){
  return new Promise(function(resolve,reject){
    if(info!=undefined)
    if(info.key=="-1" || info.key==-1){
      getAllInfo().then((data)=>{
        info.key=data.length.toString()
        firebase.firestore().collection('info').doc(info.key).set(info)
      })
    }else{
      firebase.firestore().collection('info').doc(info.key).update(info)
    }
  })
}

export function getAbout(){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('settings').doc("about").get().then((snapshot)=>{
      resolve(snapshot.data().text)
    })
  })
}

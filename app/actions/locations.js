
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

export function getEventLocations(){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('locations').where("type","==","eventLocation").where("valid","==",true).get().then((qsnapshot)=>{
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

export function writeLocation(location){
  return new Promise(function(resolve,reject){
    if(location!=undefined)
    if(location.key=="-1" || location.key==-1){
      getAllLocations().then((data)=>{
        location.key=data.length.toString()
        firebase.firestore().collection('locations').doc(location.key).set(location)
      })
    }else{
      firebase.firestore().collection('locations').doc(location.key).update(location)
      let eventsRef = firebase.firestore().collection('events')
      let newsRef = firebase.firestore().collection('info')
      eventsRef.where("location","==",location.key).get().then((eventsSnapshot)=>{
        firebase.firestore().runTransaction(async transaction => {
          eventsSnapshot.forEach((doc)=>{
            let event = doc.data()
            event.locationInfo=location.title
            transaction.set(eventsRef.doc(event.key), event)
          })
        })
      })
    newsRef.where("locationKey","==",location.key).get().then((newsSnapshot)=>{
      firebase.firestore().runTransaction(async transaction => {
        newsSnapshot.forEach((doc)=>{
          let news = doc.data()
          news.locationInfo=location.title
          transaction.set(newsRef.doc(news.key), news)
        })
      })
    })
    }
    resolve()
  })
}

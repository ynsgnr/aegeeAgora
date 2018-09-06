
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
      let ref = firebase.firestore().collection('events')
      ref.where("location","==",location.key).get().then((qsnapshot)=>{
        let dataArray=[]
        qsnapshot.forEach((doc)=>dataArray.push(doc.data()))
        firebase.firestore().runTransaction(async transaction => {
          for(i=0;i<dataArray.length;i++){
            dataArray[i].locationInfo=location.title
            transaction.set(ref.doc(dataArray[i].key), dataArray[i])
          }
        }).then(()=>resolve())
      }).then(()=>resolve())
    }
  })
}

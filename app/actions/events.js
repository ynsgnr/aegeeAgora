
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

export function writeEvent(event){
  return new Promise(function(resolve,reject){
    if(event!=undefined)
    if(event.key=="-1" || event.key==-1){
      getAllEvents().then((data)=>{
        event.key=data.length.toString()
        firebase.firestore().collection('events').doc(event.key).set(event)
      })
    }else{
      firebase.firestore().collection('events').doc(event.key).update(event)
    }
  })
}

export function constructDayKey(d){
  let timeString = "";
      if (d.getDate()<10){
    timeString=timeString+"0"+d.getDate()
  }else{
    timeString=timeString+d.getDate()
  }
  timeString=timeString+"-"
  if (d.getMonth()<9){
    timeString=timeString+"0"+(d.getMonth()+1)
  }else{
    timeString=timeString+(d.getMonth()+1)
  }
  timeString=timeString+"-"+d.getFullYear()
  return timeString
}

export function constructHourKey(d){
  let timeString = "";
  if (d.getHours()<10){
    timeString=timeString+"0"+d.getHours()
  }else{
    timeString=timeString+d.getHours()
  }
  timeString=timeString+":"
  if (d.getMinutes()<10){
    timeString=timeString+"0"+d.getMinutes()
  }else{
    timeString=timeString+d.getMinutes()
  }
  return timeString
}

export function constructReverseDayKey(d){
  let timeString = "";
  timeString=timeString+d.getFullYear()+"-"
  if (d.getMonth()<9){
    timeString=timeString+"0"+(d.getMonth()+1)
  }else{
    timeString=timeString+(d.getMonth()+1)
  }
  timeString=timeString+"-"
  if (d.getDate()<10){
    timeString=timeString+"0"+d.getDate()
  }else{
    timeString=timeString+d.getDate()
  }
  return timeString
}

export function getWeekDay(d){
  switch(d.getDay()){
    case 0:
      return "Sunday"
    case 1:
      return "Monday"
    case 2:
      return "Tuesday"
    case 3:
      return "Wednesday"
    case 4:
      return "Thursday"
    case 5:
      return "Friday"
    case 6:
      return "Saturday"
  }
}

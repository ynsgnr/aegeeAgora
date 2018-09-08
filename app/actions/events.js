
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
      let newsRef = firebase.firestore().collection('info')
      newsRef.where("eventKey","==",event.key).get().then((newsSnapshot)=>{
        firebase.firestore().runTransaction(async transaction => {
          newsSnapshot.forEach((doc)=>{
            let news = doc.data()
            news.eventInfo=event.title
            transaction.set(newsRef.doc(news.key), news)
          })
        })
      })
    }
    resolve()
  })
}

export function getAllEventsByDay(){
  return new Promise(function(resolve,reject){
    getAllEvents().then((val)=>{
      let dayList={}
      for(i=0;i<val.length;i++){
        val[i].startDate = new Date(val[i].startDate)
        val[i].endDate = new Date(val[i].endDate)

        let dayKey = constructDayKey(val[i].startDate)

        if(dayList[dayKey]==undefined) dayList[dayKey]={}

        let hourKey = constructHourKey(val[i].startDate)

        if(dayList[dayKey][hourKey]==undefined) dayList[dayKey][hourKey]=[]
        dayList[dayKey][hourKey].push(val[i])
      }
      resolve(dayList)
    })
  })
}

export function getLocationEventsByDay(location){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('events').where("location","==",location.toString()).get().then((qsnapshot)=>{
      let dayList={}
      qsnapshot.forEach((val)=>{
        val.data().startDate = new Date(val.data().startDate)
        val.data().endDate = new Date(val.data().endDate)

        let dayKey = constructDayKey(val.data().startDate)

        if(dayList[dayKey]==undefined) dayList[dayKey]={}

        let hourKey = constructHourKey(val.data().startDate)

        if(dayList[dayKey][hourKey]==undefined) dayList[dayKey][hourKey]=[]
        dayList[dayKey][hourKey].push(val.data())
      })
      resolve(dayList)
    })
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

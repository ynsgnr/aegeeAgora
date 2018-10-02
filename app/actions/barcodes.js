
//This file is about event branch for databaase operations

//Always return a promise and always resolve with an array

import firebase from 'react-native-firebase'

export function getStart(){
  return new Promise(function(resolve,reject){
    firebase.firestore().collection('settings').doc("barcodeStart").get().then((snapshot)=>{
      resolve(snapshot.data().start)
    })
  })
}

export function loginToSystem(){
  return fetch("https://www.zeus.aegee.org/statutoryvote/jc/", {
      method: "GET",
    }).then((response) => {
      return response
    })
}

export function login(username,password,cookie){
    return fetch("https://www.zeus.aegee.org/statutoryvote/oms/login.php", {
      method: "POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body:"sess_user="+username+"&sess_pass="+password
    }).then((response) => {
      return response
  });
}


export function doSomethingWithBarcode(barcodeNum){
    return fetch("https://www.zeus.aegee.org/statutoryvote/jc/barcodes.php", {
      method: "POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded",
      },
      body:"participantId="+barcodeNum
    }).then((response) => {
      serverMessage = response.url.split("+")
      let message = ""
      let i=1
      while(!serverMessage[i].includes("%")){
        message=message+" "+serverMessage[i]
        i++
      }
      message=message+serverMessage[i].split("%")[0]
      if(message==""){
          console.log("Identified character from other source");
          return "Format Error"
      }
      return message
  });
}

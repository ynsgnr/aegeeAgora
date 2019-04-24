
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
  return new Promise((resolve,reject)=>{
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this)
        resolve(this);
      }
    });
    xhr.open("GET", "https://www.zeus.aegee.org/statutoryvote/jc/");
    xhr.setRequestHeader("cache-control", "no-cache");
    //xhr.setRequestHeader("Postman-Token", "79014902-7dd0-406f-83c8-919e04eb18cb");
    xhr.send(data);
  })
}

export function login(username,password){
  return new Promise((resolve,reject)=>{
    var data = "sess_user=scanners&sess_pass=Pineapple18&undefined=";
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this)
        resolve(this);
      }
    });
    xhr.open("POST", "https://www.zeus.aegee.org/statutoryvote/oms/login.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("cache-control", "no-cache");
    //xhr.setRequestHeader("Postman-Token", "6281a810-ba31-4078-94ac-2bf60bd38407");
    xhr.send(data);
  })
}


export function doSomethingWithBarcode(barcodeNum){
    return new Promise((resolve,reject)=>{
      var data = "participantId="+barcodeNum+"&undefined=";
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this)
          serverMessage = this.responseURL.split("+")
          let message = ""
          let i=1
          console.log(serverMessage)
          if(serverMessage.length==1){resolve("Format Error");return;}
          while(serverMessage[i] && !serverMessage[i].includes("%")){
            message=message+" "+serverMessage[i]
            i++
          }
          message=message+serverMessage[i].split("%")[0]
          if(message==""){
              console.log("Identified character from other source");
              message="Format Error"
          }
          resolve(message)
        }
      });
      xhr.open("POST", "https://www.zeus.aegee.org/statutoryvote/jc/barcodes.php");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("cache-control", "no-cache");
      //xhr.setRequestHeader("Postman-Token", "77407a0d-ea7e-4c57-9b80-115c6235c3de");
      xhr.send(data);
    })
}
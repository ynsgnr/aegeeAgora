
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
          //Not found url https://www.zeus.aegee.org/statutoryvote/jc/barcodes.php?m=ERR111%3A+Participant+005-0500+not+found+in+the+database%21%3Cbr+%2F%3E%0A%09%09%09%09%09%09%09%09%09%09%09If+you+are+a+delegate+of+an+antenna%2C+come+in+and+talk+to+the+Chair%21+Next+please%21%3Cbr+%2F%3E%0A%09%09%09%09%09%09%09%09%09%09%09If+you+are+an+envoy+of+a+contact+antenna%2C+come+in+and+talk+to+the+Chair%21+Next+please%21%3Cbr+%2F%3E%0A%09%09%09%09%09%09%09%09%09%09%09If+you+are+not+in+the+above+categories%2C+please+pass+from+the+entrances+for+the+visitors+in+the+future%21+Next+please%21
          //Success url https://www.zeus.aegee.org/statutoryvote/jc/barcodes.php?m=%3Ch1+style%3D%27color%3Ared%3B%27%3EMerilyn+Isok+exited%3C%2Fh1%3E
          //FOrmat error url https://www.zeus.aegee.org/statutoryvote/jc/barcodes.php

          var finalMessage
          var url = this.responseURL.split("=")
          if(url.length==1){resolve("Format Error");return;}
          var message = decodeURIComponent(url[1])
          var parsedMessage = message.split(">")
          console.log(parsedMessage)
          if(!parsedMessage[0].includes("ERR")){
            finalMessage = parsedMessage[1].split("<")[0].split("+").join(" ");
          }else{
            console.log(parsedMessage[0].split("<"))
            finalMessage = parsedMessage[0].split("<")[0].split("+").join(" ");
          }
          resolve(finalMessage)
        }
      });
      xhr.open("POST", "https://www.zeus.aegee.org/statutoryvote/jc/barcodes.php");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("cache-control", "no-cache");
      //xhr.setRequestHeader("Postman-Token", "77407a0d-ea7e-4c57-9b80-115c6235c3de");
      xhr.send(data);
    })
}
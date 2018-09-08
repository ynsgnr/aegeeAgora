
//This file used for initilazation with mock data.

import firebase from 'react-native-firebase'

export function resetDatabase(){
  console.log("Resetting Database!");
  writeEventsMockData()
  writeInfoMockData()
  writeLocationMockData()
  writeInfoTypes()
  writeInitLocation()
  writeLocationTypes()
}

export function writeEventsMockData(){
  let mockData = [ {
          "description" : "Blablabla",
          "endDate" : "2018-08-24T06:02:00.000Z",
          "key" : "0",
          "location" : 0,
          "locationInfo" : "Test Location Info",
          "startDate" : "2018-08-24T04:01:00.000Z",
          "title" : "Test Event 1",
          "valid" : true
        }, {
          "description" : "Blablabla",
          "endDate" : "2018-08-24T08:03:00.000Z",
          "key" : "1",
          "location" : 0,
          "locationInfo" : "Test Location Info",
          "startDate" : "2018-08-24T06:15:00.000Z",
          "title" : "Test Event 2",
          "valid" : true
        }, {
          "description" : "Blablabla",
          "endDate" : "2018-08-24T12:33:00.000Z",
          "key" : "2",
          "location" : 0,
          "locationInfo" : "Test Location Info",
          "startDate" : "2018-08-24T08:03:00.000Z",
          "title" : "Test Event 3",
          "valid" : true
        }, {
          "description" : "Blablabla",
          "endDate" : "2018-08-24T12:33:00.000Z",
          "key" : "3",
          "location" : 0,
          "locationInfo" : "Test Location Info",
          "startDate" : "2018-08-24T11:33:00.000Z",
          "title" : "Test Event 4",
          "valid" : true
        }, {
          "description" : "Blablabla",
          "endDate" : "2018-08-24T12:33:00.000Z",
          "key" : "4",
          "location" : 0,
          "locationInfo" : "Test Location Info",
          "startDate" : "2018-08-24T11:33:00.000Z",
          "title" : "Test Event 5",
          "valid" : true
        }, {
          "description" : "Blablabla",
          "endDate" : "2018-08-24T12:33:00.000Z",
          "key" : "5",
          "location" : 0,
          "locationInfo" : "Test Location Info",
          "startDate" : "2018-08-24T11:33:00.000Z",
          "title" : "Test Event 6",
          "valid" : true
        }, {
          "description" : "Blablabla",
          "endDate" : "2018-08-24T13:33:00.000Z",
          "key" : "6",
          "location" : 0,
          "locationInfo" : "Test Location Info",
          "startDate" : "2018-08-24T12:33:00.000Z",
          "title" : "Test Event 7",
          "valid" : true
        }, {
          "description" : "Blablabla",
          "endDate" : "2018-08-24T15:33:00.000Z",
          "key" : "7",
          "location" : 0,
          "locationInfo" : "Test Location Info",
          "startDate" : "2018-08-24T13:33:00.000Z",
          "title" : "Test Event 8",
          "valid" : true
        }, {
          "description" : "Blablabla",
          "endDate" : "2018-08-24T16:33:00.000Z",
          "key" : "8",
          "location" : 0,
          "locationInfo" : "Test Location Info",
          "startDate" : "2018-08-24T15:33:00.000Z",
          "title" : "Test Event 9",
          "valid" : true
        } ]
  writeArrayToBranch("events",mockData)
}

export function writeInfoMockData(){
  let mockData = [ {
      "eventKey" : "",
      "image" : "https://openclipart.org/image/2400px/svg_to_png/202776/pawn.png",
      "key" : "0",
      "link" : "05555555555",
      "locationKey" : "",
      "text" : "Duty",
      "title" : "Name Surname",
      "type" : "contact",
      "valid" : true
    }, {
      "eventKey" : "",
      "image" : "https://openclipart.org/image/2400px/svg_to_png/202776/pawn.png",
      "key" : "1",
      "link" : "05555555555",
      "locationKey" : "",
      "text" : "Duty",
      "title" : "Name Surname",
      "type" : "contact",
      "valid" : true
    }, {
      "eventKey" : "",
      "image" : "https://cdn2.iconfinder.com/data/icons/55-files-and-documents/512/Icon_17-512.png",
      "key" : "2",
      "link" : "http://aegee.org/",
      "locationKey" : "",
      "text" : "Document explanation",
      "title" : "Document name",
      "type" : "download",
      "valid" : true
    }, {
      "eventKey" : "",
      "image" : "https://cdn2.iconfinder.com/data/icons/55-files-and-documents/512/Icon_17-512.png",
      "key" : "3",
      "link" : "http://aegee.org/",
      "locationKey" : "",
      "text" : "Document explanation",
      "title" : "Document name",
      "type" : "download",
      "valid" : true
    }, {
      "eventKey" : "",
      "image" : "https://cdn2.iconfinder.com/data/icons/55-files-and-documents/512/Icon_17-512.png",
      "key" : "4",
      "link" : "http://aegee.org/",
      "locationKey" : "",
      "text" : "Document explanation",
      "title" : "Document name",
      "type" : "download",
      "valid" : true
    }, {
      "eventKey" : "",
      "image" : "https://i.pinimg.com/originals/9e/2b/0a/9e2b0a924f1c13b93c96fb3c16dd6486.jpg",
      "key" : "5",
      "link" : "http://aegee.org/",
      "locationKey" : "",
      "text" : "Info Here",
      "title" : "Bonus info title",
      "type" : "bonus",
      "valid" : true
    }, {
      "eventKey" : "",
      "image" : "https://i.pinimg.com/originals/9e/2b/0a/9e2b0a924f1c13b93c96fb3c16dd6486.jpg",
      "key" : "6",
      "link" : "http://aegee.org/",
      "locationKey" : "",
      "text" : "News Info",
      "title" : "News Title",
      "type" : "news",
      "valid" : true
    }, {
      "eventKey" : "",
      "image" : "https://i.pinimg.com/originals/9e/2b/0a/9e2b0a924f1c13b93c96fb3c16dd6486.jpg",
      "key" : "7",
      "link" : "http://aegee.org/",
      "locationKey" : "",
      "text" : "News Info 2",
      "title" : "News Title 2",
      "type" : "news",
      "valid" : true
    } ]
  writeArrayToBranch('info',mockData)
}

export function writeLocationMockData(){
    let mockData=[ {
        "Lat" : 41.011394,
        "Long" : 28.925189,
        "key" : "0",
        "title" : "Test Building",
        "text" : "Test Location Description",
        "description" : "Test Room",
        "type" : "eventLocation",
        "insideMap" : "",
        "valid" : true
      }, {
        "Lat" : 41.012394,
        "Long" : 28.923189,
        "description" : "Test wifi",
        "key" : "1",
        "title" : "Store wifi",
        "type" : "wifi",
        "valid" : true
      }, {
        "Lat" : 41.013993,
        "Long" : 28.924406,
        "description" : "Supermarket with no alcohol",
        "key" : "2",
        "title" : "Kim Market",
        "type" : "store",
        "valid" : true
      }, {
        "Lat" : 41.011693,
        "Long" : 28.928329,
        "description" : "Home Sweet Home",
        "key" : "3",
        "title" : "Gym",
        "type" : "gym",
        "valid" : true
      } ]
    writeArrayToBranch('locations',mockData)
}

export function writeInfoTypes(){
  firebase.firestore().collection('settings').doc('infoTypes').set(
    {
      "titles" : {
        "bonus" : "Bonus Info",
        "contact" : "Contacts",
        "download" : "Downloads",
        "news" : "News"
      },
      "types" : [ "contact", "bonus", "download" ]
    }
  )
}

export function writeInitLocation(){
  firebase.firestore().collection('settings').doc('initRegion').set({
    "latitude" : 41.0164533,
    "latitudeDelta" : 0.0922,
    "longitude" : 28.9900075,
    "longitudeDelta" : 0.0421
  })
}

export function writeLocationTypes(){
  firebase.firestore().collection('settings').doc('locationTypes').set({
    "colors" : {
      "eventLocation" : "rgb(238, 154, 154)",
      "gym" : "rgb(255, 193, 6)",
      "store" : "rgb(139, 195, 74)",
      "wifi" : "rgb(0, 188, 212)"
    },
    "titles" : {
      "eventLocation" : "Events",
      "gym" : "Gym",
      "store" : "Store",
      "wifi" : "Wifi"
    },
    "types" : [ "eventLocation", "wifi", "store", "gym" ]
  })
}

export function writeArrayToBranch(branch,data){
  //Overwrites existing data based on key ,in the branch use with caution!
  //branch: branch name
  //data: array of data to write to branch
  const ref = firebase.firestore().collection(branch)
  for(i=0;i<data.length;i++){
    ref.doc(i.toString()).set(data[i])
  }
}

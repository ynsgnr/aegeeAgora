
//This file is about location branch for databaase operations

//Always return a promise and always resolve with an array

export function getAllLocations(){
  return new Promise(function(resolve,reject){
    //Get object here
    resolve(
      [
        {
          key:'0',
          news:[],
          eventsHere:[], //key
          Lat: 42,
          Long: 41,
          type: 'eventLocation',
          Building: 'Test Building',
          Room: 'Test Room',
          InsideMap: '',
          Description: 'Test Location Description',
        },
        {
          key:'1',
          Lat: 42,
          Long: 41,
          type: 'wifi',
        },
        {
          key:'2',
          Lat: 42,
          Long: 41,
          type: 'store',
        },
        {
          key:'3',
          Lat: 42,
          Long: 41,
          type: 'gym',
        },
      ]
    )
  })
}

export function getTypes(){
  return new Promise(function(resolve,reject){
    //Get object here
    resolve(
      {
        types:['eventLocation','wifi','store','gym'],
        titles:{
          eventLocation:'Events',
          wifi:'Wifi',
          store:'Store',
          gym:'Gym',
        }
      }
    )
  })
}

export function getInitalRegion(){
  return new Promise(function(resolve,reject){
    //Get object here
    resolve(
      {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    )
  })
}

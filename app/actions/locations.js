
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
          Lat: 41.011394,
          Long: 28.925189,
          type: 'eventLocation',
          title: 'Test Building',
          description: 'Test Room',
          InsideMap: '',
          Description: 'Test Location Description',
        },
        {
          key:'1',
          Lat: 41.012394,
          Long: 28.923189,
          type: 'wifi',
          title: 'Store wifi',
          description: 'Test wifi',
        },
        {
          key:'2',
          Lat: 41.013993,
          Long: 28.924406,
          type: 'store',
          title: 'Kim Market',
          description: 'Supermarket with no alcohol',
        },
        {
          key:'3',
          Lat: 41.011693,
          Long: 28.928329,
          type: 'gym',
          title: 'Gym',
          description: 'Home Sweet Home',
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
        latitude: 41.0164533,
        longitude: 28.9900075,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    )
  })
}

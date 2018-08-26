
//This file is about event branch for databaase operations

//Always return a promise and always resolve with an array

export function getAllEvents(){
  return new Promise(function(resolve,reject){
    //Get object here
    resolve(
      [
        {
          //Return Object here
          key:'0', //switch to a string
          location:0,
          locationInfo:'Test Location Info', //Generated here
          news:[],
          title:'Test Event 1',
          startDate: new Date(2018, 7, 24, 7, 1),
          endDate: new Date(2018, 7, 24, 9, 2),
          description: 'Blablabla',
        },
        {
          //Return Object here
          key:'1', //switch to a string
          location:0,
          locationInfo:'Test Location Info', //Generated here
          news:[],
          title:'Test Event 2',
          startDate: new Date(2018, 7, 24, 9, 15),
          endDate: new Date(2018, 7, 24, 11, 3),
          description: 'Blablabla',
        },
        {
          //Return Object here
          key:'2', //switch to a string
          location:0,
          locationInfo:'Test Location Info', //Generated here
          news:[],
          title:'Test Event 3',
          startDate: new Date(2018, 7, 24, 11, 3),
          endDate: new Date(2018, 7, 24, 15, 33),
          description: 'Blablabla',
        },
        {
          //Return Object here
          key:'3', //switch to a string
          location:0,
          locationInfo:'Test Location Info', //Generated here
          news:[],
          title:'Test Event 4',
          startDate: new Date(2018, 7, 24, 14, 33),
          endDate: new Date(2018, 7, 24, 15, 33),
          description: 'Blablabla',
        },
        {
          //Return Object here
          key:'4', //switch to a string
          location:0,
          locationInfo:'Test Location Info', //Generated here
          news:[],
          title:'Test Event 5',
          startDate: new Date(2018, 7, 24, 14, 33),
          endDate: new Date(2018, 7, 24, 15, 33),
          description: 'Blablabla',
        },
        {
          //Return Object here
          key:'40', //switch to a string
          location:0,
          locationInfo:'Test Location Info', //Generated here
          news:[],
          title:'Test Event 6',
          startDate: new Date(2018, 7, 24, 14, 33),
          endDate: new Date(2018, 7, 24, 15, 33),
          description: 'Blablabla',
        },
        {
          //Return Object here
          key:'5', //switch to a string
          location:0,
          locationInfo:'Test Location Info', //Generated here
          news:[],
          title:'Test Event 7',
          startDate: new Date(2018, 7, 24, 15, 33),
          endDate: new Date(2018, 7, 24, 16, 33),
          description: 'Blablabla',
        },
        {
          //Return Object here
          key:'6', //switch to a string
          location:0,
          locationInfo:'Test Location Info', //Generated here
          news:[],
          title:'Test Event 8',
          startDate: new Date(2018, 7, 24, 16, 33),
          endDate: new Date(2018, 7, 24, 18, 33),
          description: 'Blablabla',
        },
        {
          //Return Object here
          key:'7', //switch to a string
          location:0,
          locationInfo:'Test Location Info', //Generated here
          news:[],
          title:'Test Event 9',
          startDate: new Date(2018, 7, 24, 18, 33),
          endDate: new Date(2018, 7, 24, 19, 33),
          description: 'Blablabla',
        }
      ]
    )
  })
}


export function getEventByKey(key){
  return new Promise(function(resolve,reject){
    //Get object here
    if(key=='1')
      resolve(
        [
          {
            //Return Object here
            key:'1', //switch to a string
            location:'1',
            locationInfo:'Test Location Info 1', //Generated here
            news:[],
            title:'Test Event 2',
            startDate: new Date(2018, 7, 24, 7, 1),
            endDate: new Date(2018, 7, 24, 9, 2),
            description: 'Blablabla',
          },
        ]
      )
      if(key=='0')
        resolve(
          [
            {
              //Return Object here
              key:'0', //switch to a string
              location:'0',
              locationInfo:'Test Location Info 2', //Generated here
              news:[],
              title:'Test Event 1',
              startDate: new Date(2018, 7, 24, 7, 1),
              endDate: new Date(2018, 7, 24, 9, 2),
              description: 'Blablabla',
            },
          ]
        )
  })
}

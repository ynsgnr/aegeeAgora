
import React, {Component} from 'react';
import {Platform, TouchableOpacity, Text, View, StyleSheet, Dimensions,ActivityIndicator} from 'react-native'

//import styles from '../resources/styles' //Does not work well with maps
import colors from '../resources/colors'

import NavBar from '../components/navBar'

import MapView, {Marker} from 'react-native-maps'
import Permissions from 'react-native-permissions'

import {getAllLocations,getTypes,getInitalRegion} from '../actions/locations'

const title = "Map"

export default class Map extends Component {

  constructor(props){
    super(props)
    this.state={
      locationList : {},
      buttonList : [],
      markers:[],
      loading:true,
      intialRegion:{
        latitude: 37.78825,
        longitude: -122.4324,
      }
    }
  }

  componentDidMount(){
    getAllLocations().then( (val) => {
      getTypes().then( (typesAndTitles) => {
        getInitalRegion().then( (region) => {
          let buttonList=[]
          for(i=0;i<typesAndTitles.types.length;i++){
            let type = typesAndTitles.types[i]
            buttonList.push({
                key:type,
                title:typesAndTitles.titles[type],
                status:true,
              })
          }

          this.setState({
            buttonList:buttonList,
            loading:false,
            intialRegion:region,
          })
        })

      })
    })
    Permissions.request('location').then(response => {
        console.log(response);
        //TODO check on other android and ios phones
    })
  }


  onLocationTypeButtonPress(buttonIndex){
    console.log(buttonIndex);
  }


  getButtonStyle(state){
    let style=
      {
        width:50,
        height:50,
        marginBottom:10,
        borderRadius:50,
        justifyContent: 'space-around',
        alignItems:'center',
        flexDirection:'row',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.08)',
      }
      if(state)
        style['backgroundColor'] = 'rgba(255, 255, 255, 1)'
      else
        style['backgroundColor'] =  'rgba(255, 255, 255, 0.5)'
    return style
  }

  render() {
    return (
      <View>
        <NavBar title={title}/>
          {this.state.loading ? <ActivityIndicator size="large"/> :
            <View style ={style.mapContainer}>
              <MapView
                showsUserLocation={true}
                showsMyLocationButton={true}
                style={style.map}
                initialRegion={this.state.intialRegion}
              >
              {this.state.markers.map(marker => (
                 <Marker
                   coordinate={marker.latlng}
                   title={marker.title}
                   description={marker.description}
                 />
               ))}
              </MapView>
              <View style={style.buttonContainer}>
              {this.state.buttonList.map( (button,index) => (
                <TouchableOpacity key={index} style={this.getButtonStyle(button.status)} onPress={()=>this.onLocationTypeButtonPress(index)}>
                  <Text>{button.title}</Text>
                </TouchableOpacity>
              ))}
              </View>
            </View>
          }
      </View>
    );
  }
}

const style = StyleSheet.create({
 mapContainer: {
   height: Dimensions.get('window').height*0.82,
   width: Dimensions.get('window').width,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
 buttonContainer:{
   height: Dimensions.get('window').height*0.82,
   width: Dimensions.get('window').width,
   padding:10,
   alignItems:'flex-end',
   justifyContent:'flex-end',
   flexDirection:'column',
 },
});

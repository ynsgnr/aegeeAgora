
import React, {Component} from 'react';
import {Platform, TouchableOpacity, Text, View, StyleSheet, Dimensions, ActivityIndicator, Linking} from 'react-native'

import { NavigationEvents } from 'react-navigation';

//import styles from '../resources/styles' //Does not work well with maps
import colors from '../resources/colors'

import NavBar from '../components/navBar'

import MapView, {Marker} from 'react-native-maps'
import Permissions from 'react-native-permissions'

import firebase from 'react-native-firebase';

import {getAllLocations,getTypes,getInitalRegion} from '../actions/locations'

const title = "Map"

export default class Map extends Component {

  constructor(props){
    super(props)
    this.state={
      buttonList : [],
      markerLists:{},
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
                color:typesAndTitles.colors[type],
              })
          }

          let markerLists={}
          for(i=0;i<val.length;i++){
            let type = val[i].type
            if(markerLists[type]==undefined)markerLists[type]=[]
            markerLists[type].push({
                latlng :{
                  latitude:val[i].Lat,
                  longitude:val[i].Long,
                },
                title:val[i].title,
                description:val[i].description,
                key:val[i].key,
                Lat:val[i].Lat,
                Long:val[i].Long,
                text:val[i].text,
                type:val[i].type,
                insideMap:val[i].insideMap,
                valid:true,
              })
          }

          this.setState({
            buttonList:buttonList,
            loading:false,
            intialRegion:region,
            markerLists:markerLists
          })
        })

      })
    })
    Permissions.request('location').then(response => {
        console.log("Location Permission response: "+response);
        //TODO check on other android and ios phones
    })
  }


  onLocationTypeButtonPress(buttonIndex){
    this.setState((previousState)=>{
      previousState.buttonList[buttonIndex].status=!previousState.buttonList[buttonIndex].status
      return previousState
    })
  }


  getButtonStyle(button){
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
      let colorString = button.color
      colorString = colorString.slice(3,-1)
      if(button.status)
        style['backgroundColor'] = 'rgba'+ colorString+', 1)'
      else
        style['backgroundColor'] =  'rgba(250, 250, 250, 0.5)'
    return style
  }


  openMaps(title,latlng){
    Linking.openURL(
      Platform.select({
        ios: 'maps:0,0?q='+title+'@'+latlng.latitude+','+latlng.longitude ,
        android: 'geo:0,0?q='+latlng.latitude+','+latlng.longitude+'('+title+')'
      })
    )
  }

  render() {
    return (
      <View>
        <NavigationEvents onWillFocus={payload => this.componentDidMount()} />
        <NavBar title={title} navigation={this.props.navigation} rigthButton={firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous} onRigthButtonPress={()=>this.props.navigation.push('EditLocationPage')}/>
          {this.state.loading ? <View style={styles.centered}><ActivityIndicator size="large"/></View> :
            <View style ={style.mapContainer}>
              <MapView
                showsUserLocation={true}
                showsMyLocationButton={true}
                style={style.map}
                initialRegion={this.state.intialRegion}
              >
              {this.state.buttonList.map( (button) => (
                button.status && this.state.markerLists[button.key]!=undefined &&
                this.state.markerLists[button.key].map( (marker) => (
                  <Marker
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                    key={marker.key}
                    pinColor={button.color}
                    onCalloutPress={()=>{
                      if(firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous) this.props.navigation.push('EditLocationPage',{location:marker})
                      else if(marker.type=="eventLocation") this.props.navigation.push('LocationPage',{location:marker})
                      else this.openMaps(marker.title,marker.latlng)
                    }}
                  />
                ))
              ))}
              </MapView>
              <View style={style.buttonContainer}>
              {this.state.buttonList.map( (button,index) => (
                <TouchableOpacity key={index} style={this.getButtonStyle(button)} onPress={()=>this.onLocationTypeButtonPress(index)}>
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

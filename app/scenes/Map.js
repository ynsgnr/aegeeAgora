
import React, {Component} from 'react';
import {Platform, Text, View, StyleSheet, Dimensions} from 'react-native'

//import styles from '../resources/styles' //Does not work well with maps

import NavBar from '../components/navBar'

import MapView from 'react-native-maps';

const title = "Map"

export default class Map extends Component {

  render() {
    return (
      <View>
        <NavBar title={title}/>
        <View style ={style.container}>
          <MapView
            style={style.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
 container: {
   height: Dimensions.get('window').height*0.82,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

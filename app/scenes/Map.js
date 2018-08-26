
import React, {Component} from 'react';
import {Platform, TouchableOpacity, Text, View, StyleSheet, Dimensions,ActivityIndicator} from 'react-native'

//import styles from '../resources/styles' //Does not work well with maps
import colors from '../resources/colors'

import NavBar from '../components/navBar'

import MapView from 'react-native-maps'

import {getAllLocations,getTypes} from '../actions/locations'

const title = "Map"

export default class Map extends Component {

  constructor(props){
    super(props)
    this.state={
      locationList : {},
      buttonList : [],
      loading:true,
    }
  }


  componentDidMount(){
    getAllLocations().then( (val) => {
      getTypes().then( (typesAndTitles) => {
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
        })
      })
    })
  }

  renderButtons(){
    let buttons=[]
    for(i=0;i<this.state.buttonList.length;i++){
      let buttonIndex = i
      buttons.push(
          <TouchableOpacity key={buttonIndex} style={this.getButtonStyle(this.state.buttonList[i].status)} onPress={()=>console.log(buttonIndex)}>
            <Text>{this.state.buttonList[i].title}</Text>
          </TouchableOpacity>
        )
    }
    return buttons
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
                style={style.map}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
              <View style={style.buttonContainer}>
                {this.renderButtons()}
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
   justifyContent:'flex-start',
   flexDirection:'column',
 },
});

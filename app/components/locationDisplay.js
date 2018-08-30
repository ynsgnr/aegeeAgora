
import React, {Component} from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator, Image, Dimensions,StyleSheet} from 'react-native'

import styles from '../resources/styles'
import colors from '../resources/colors'

import {getLocationByKey} from '../actions/locations'

import MapView, {Marker} from 'react-native-maps'

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class LocationDisplay extends Component {

  //Props avaliable by component props or navigation paramaters
  //component props overwrites Navigation paramaters
  //locationKey overwrites location obect
  static defaultProps = {
    locationKey:"",
    location: undefined,
    height:50,
    onPress:{function(){console.log("Pressed on map component")}},
    style:{paddingBottom:30}
  }

  constructor(props){
    super(props)
    this.state={
      location : {},
      locationKey : "",
      loading: true,
    }
  }

  componentDidMount(){
    //if there is locationkey, get location from db, locationkey overwrites location object with location object from db
    if(this.props.locationKey!=""){
      getLocationByKey(this.props.locationKey).then( (val) =>{
        this.setState({
          location:val,
          loading:false,
        })
      })
    }else if(this.props.location!=undefined && this.props.location!={}){
      this.setState({
        location:this.props.location,
        loading:false,
      })
    }else{
      console.log("Please give locationKey or location object as props to location display component, given props are:");
      console.log(this.props);
    }
  }

  render() {
    if(this.state.loading) return <ActivityIndicator style={this.props.style} size="large"/>
    return (
      <TouchableOpacity style={this.props.style} onPress={()=>this.props.onPress()}>
        <View style ={[style.mapContainer,{height:this.props.height}]}>
          <MapView
            style={style.map}
            initialRegion={
                          {
                            latitude:this.state.location.Lat,
                            latitudeDelta : 0.0922,
                            longitude:this.state.location.Long,
                            longitudeDelta : 0.0421,
                          }
                        }
            cacheEnabled={true}
            pitchEnabled={false}
            scrollEnabled={false}
            rotataEnabled={false}
            zoomControlEnabled={false}
          >
            <Marker coordinate={
              {
                latitude:this.state.location.Lat,
                longitude:this.state.location.Long,
              }
            }/>
          </MapView>
        </View>
      </TouchableOpacity>
    )
  }

}

const style = StyleSheet.create({
 mapContainer: {
   width: Dimensions.get('window').width,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});


import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Image, ScrollView, Linking, Dimensions} from 'react-native';

import {getLocationByKey} from '../actions/locations'

import LocationDisplay from '../components/locationDisplay'

import styles from '../resources/styles'

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class EditLocation extends Component {

  //Props avaliable by component props or navigation paramaters
  //component props overwrites Navigation paramaters
  //locationKey overwrites location obect
  static defaultProps = {
    locationKey:"",
    location: undefined,
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('locationName', 'Loading...')
    };
  };

  constructor(props){
    super(props)
    this.state={
      location : {},
      locationKey : "",
      loading: true,
      editMode: false,
    }
  }

  openMaps(title,latlng){
    Linking.openURL(
      Platform.select({
        ios: 'maps:0,0?q='+title+'@'+latlng.latitude+','+latlng.longitude ,
        android: 'geo:0,0?q='+latlng.latitude+','+latlng.longitude+'('+title+')'
      })
    )
  }

  componentDidMount(){
    let locationKey = ""
    let location = {}

    //Get location or locationKey from props or navigation params, props overwrites navigation params
    if(this.props.locationKey=="") locationKey=this.props.navigation.getParam("locationKey", "")
    if(this.props.location==undefined){
      location=this.props.navigation.getParam("location", {} )
    }else{location=this.props.location}

    //if there is locationkey, get location from db, locationkey overwrites location object with location object from db
    if(locationKey!=""){
      getLocationByKey(locationKey.toString()).then( (val) =>{
        this.props.navigation.setParams({locationName: val.title})
        this.setState({
          location:val,
          loading:false,
        })
      })
    }else if(location!=undefined){
      this.props.navigation.setParams({locationName: location.title})
      this.setState({
        location:location,
        loading:false,
      })
    }else{
      console.log("Please give locationKey or location object as props to location page");
    }
  }

  render() {
    console.log(this.state);
    return (
      <View>
        {this.state.loading ? <View style={styles.centered}><ActivityIndicator size="large"/></View> :
          <ScrollView>
            <LocationDisplay location={this.state.location} onPress={()=>{
              this.openMaps(this.state.location.title,{latitude:this.state.location.Lat,longitude:this.state.location.Long})
            }} height={150}/>

            <View style={[styles.startOriented,{padding:5}]}>
              <Text style={styles.titleText}>{this.state.location.title}</Text>
              <Text style={styles.subText}>{this.state.location.text}</Text>
            </View>

            {(this.state.location.insideMap!=undefined && this.state.location.insideMap!="")&&
              <View style={[styles.startOriented,{paddingLeft:10}]}>
                <Text style={styles.titleText}>Inside Map</Text>
                <Image style={{width:SCREEN_WIDTH*0.9, aspectRatio: 1}} source={{uri:this.state.location.insideMap}}/>
              </View>
            }

            <View style={styles.startOriented}>
              <Text style={[styles.titleText,styles.darkText]}>Description</Text>
              <View style={styles.longTextWrapper}>
                <Text style={styles.subText}>{this.state.location.description}</Text>
              </View>
            </View>

          </ScrollView>
        }
      </View>
    );
  }

}

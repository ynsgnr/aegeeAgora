
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import {getlocationByKey} from '../actions/locations'

const title = "Location"

export default class Location extends Component {

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
      evelocationnt : {},
      locationKey : "",
      loading: true,
    }
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
      getlocationByKey(locationKey).then( (val) =>{
        this.props.navigation.setParams({locationName: val.title})
        this.setState({
          location:val,
          loading:false,
        })
      })
    }else if(location!={}){
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
    return (
      <View>
        {this.state.loading ? <ActivityIndicator size="large"/> :
          <Text>{this.state.location.title}</Text>
        }
      </View>
    );
  }

}

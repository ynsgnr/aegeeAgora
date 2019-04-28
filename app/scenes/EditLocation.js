
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Image, ScrollView, Linking, Dimensions, TextInput, TouchableOpacity, Picker} from 'react-native';

import {getLocationByKey, writeLocation, getTypes} from '../actions/locations'

import MapView, {Marker} from 'react-native-maps'

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
      title: navigation.getParam('title', 'Loading...')
    };
  };

  constructor(props){
    super(props)
    this.state={
      location : undefined,
      locationKey : "",
      loading: true,
      editMode: false,
      types:[],
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
    let location = undefined

    //Get location or locationKey from props or navigation params, props overwrites navigation params
    if(this.props.locationKey=="") locationKey=this.props.navigation.getParam("locationKey", "")
    if(this.props.location==undefined){
      location=this.props.navigation.getParam("location", undefined )
    }else{location=this.props.location}

    getTypes().then((typeData)=>
    {
      let types=[]
      for(i=0;i<typeData.types.length;i++){
          types.push(
            <Picker.Item label={typeData.titles[typeData.types[i]]} value={typeData.types[i]} key={i} />
          )
      }

      //if there is locationkey, get location from db, locationkey overwrites location object with location object from db
      if(locationKey!=""){
        this.props.navigation.setParams({title: "Edit Location"})
        getLocationByKey(locationKey.toString()).then( (val) =>{
          this.props.navigation.setParams({locationName: val.title})
          this.setState({
            location:val,
            loading:false,
            types:types,
          })
        })
      }else if(location!=undefined){
        this.props.navigation.setParams({title: "Edit Location"})
        this.props.navigation.setParams({locationName: location.title})
        this.setState({
          location:location,
          loading:false,
          types:types,
        })
      }else{
        //Add new location
        this.props.navigation.setParams({title: "Add New Location"})
        this.setState({
          location:{
            "key" : "-1",
            "title" : "",
            "text" : "",
            "description" : "",
            "type" : "eventLocation",
            "insideMap" : "",
            "valid" : true,
            "latlng" :{
              "latitude": 41.011394,
              "longitude": 28.925189,
            },
            "Lat":41.011394,
            "Long":28.925189
          },
          loading:false,
          types:types,
        })
      }
    })
  }

  render() {
    console.log(this.state)
    return (
      <View>
        {this.state.loading ? <View style={styles.centered}><ActivityIndicator size="large"/></View> :
          <ScrollView>

            <Text style={[styles.titleText,styles.darkText]}>Title:</Text>
            <TextInput  placeholder={'Title'} style={[styles.subText,styles.darkText,{marginLeft:10}]}
            onChangeText={(text)=>this.setState((previousState)=>{previousState.location.title=text;return previousState})}
            value={this.state.location.title}
            />

            <Text style={[styles.titleText,styles.darkText]}>Detailed Location:</Text>
            <TextInput  placeholder={'Ex: Classroom 5'} style={[styles.subText,styles.darkText,{marginLeft:10}]}
            onChangeText={(text)=>this.setState((previousState)=>{previousState.location.text=text;return previousState})}
            value={this.state.location.text}
            />

            <Text style={[styles.titleText,styles.darkText]}>Location Type:</Text>
            <Text style={[styles.subText,styles.darkText]}>Detailed Location and inside map is only valid for Event Locations</Text>
            <Picker
              selectedValue={this.state.location.type}
              style={{ flex:1 }}
              onValueChange={(itemValue, itemIndex) =>{
                    this.setState((previousState)=>{
                      previousState.location.type=itemValue
                      return previousState}
                    )
                  }
                }
              >
              {this.state.types}
            </Picker>

            <Text style={[styles.titleText,styles.darkText]}>Map Location:</Text>
            <Text style={[styles.subText,styles.darkText]}>Long Press to set</Text>
            <View
            onMoveShouldSetResponder={()=>{return false}}
            style ={[style.mapContainer,{height:300}]}>
              <MapView
                style={style.map}
                initialRegion={
                              {
                                latitude:this.state.location.latlng.latitude,
                                latitudeDelta : 0.0922,
                                longitude:this.state.location.latlng.longitude,
                                longitudeDelta : 0.0421,
                              }
                            }
                onLongPress={(event)=>{
                  let pressed = event.nativeEvent
                  this.setState((previousState)=>{
                    previousState.location.latlng={
                      latitude:pressed.coordinate.latitude,
                      longitude:pressed.coordinate.longitude
                    }
                    previousState.location.Lat=pressed.coordinate.latitude                    
                    previousState.location.Long=pressed.coordinate.longitude
                    return previousState
                  })
                }}
              >
                <Marker coordinate={this.state.location.latlng}/>
              </MapView>
            </View>

            <Text style={[styles.titleText,styles.darkText]}>Inside Map Link:</Text>
            <TextInput  placeholder={'Upload somewhere and copy link here'} style={[styles.subText,styles.darkText,{marginLeft:10}]}
            onChangeText={(text)=>this.setState((previousState)=>{previousState.location.insideMap=text;return previousState})}
            value={this.state.location.insideMap}/>

            {(this.state.location.insideMap!=undefined && this.state.location.insideMap!="")&&
              <View style={[styles.startOriented,{paddingLeft:10}]}>
                <Text style={styles.titleText}>Inside Map</Text>
                <Image style={{width:SCREEN_WIDTH*0.9, aspectRatio: 1}} source={{uri:this.state.location.insideMap}}/>
              </View>
            }

            <View style={styles.startOriented}>
              <Text style={[styles.titleText,styles.darkText]}>Description:</Text>
              <View style={styles.longTextWrapper}>
                <TextInput multiline placeholder={'Description'} style={[styles.subText,styles.darkText,{marginLeft:10,width:SCREEN_WIDTH*0.8}]}
                onChangeText={(text)=>this.setState((previousState)=>{previousState.location.description=text;return previousState})}
                value={this.state.location.description}/>
              </View>
            </View>
            <View style={{flex:1,flexDirection:"row"}}>
            <TouchableOpacity onPress={()=>  {console.log(this.state.location);writeLocation(this.state.location).then(()=>this.props.navigation.pop())}} style={styles.bigButton}>
              <Text style={styles.titleText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigation.pop()} style={styles.bigButton}>
              <Text style={styles.titleText}>Cancel</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        }
      </View>
    );
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

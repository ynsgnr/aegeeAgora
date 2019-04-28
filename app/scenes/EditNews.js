
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity ,Image, ScrollView, Picker, TextInput} from 'react-native';

import {getTypes, getInfoByKey, writeInfo} from '../actions/info'
import {getAllEvents} from '../actions/events'
import {getEventLocations} from '../actions/locations'

//Resources
import styles from '../resources/styles'
import colors from '../resources/colors'

export default class NewsList extends Component {

  //Props avaliable by component props or navigation paramaters
  //component props overwrites Navigation paramaters
  //locationKey overwrites location obect
  static defaultProps = {
    newsKey:"",
    news: undefined,
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Loading...')
    };
  };

  constructor(props){
    super(props)
    this.state={
      info : {},
      loading: true,
      typePickerList:[],
      eventPickerList:[],
      locationPickerList:[],
    }
  }

  componentDidMount(){
    let infoKey = ""
    let info = undefined

    //Get event or infoKey from props or navigation params, props overwrites navigation params
    if(this.props.infoKey=="") infoKey=this.props.navigation.getParam("infoKey", "")
    if(this.props.info==undefined){
      info=this.props.navigation.getParam("info", undefined )
    }else{info=this.props.info}

    //construct location picker
    getTypes().then((data)=>{
      let pickerValues = []
      for(i=0;i<data.types.length;i++){
        let name = data.titles[data.types[i]]
        let key = data.types[i]
        pickerValues.push(
          <Picker.Item label={name} value={key} key={i} />
        )
      }
      pickerValues.push(
        <Picker.Item label={"News"} value={"news"} key={-1} />
      )
      //if there is infoKey, get event from db, infoKey overwrites event object with event object from db
      if(infoKey!=""){
        getInfoByKey(infoKey).then( (val) =>{
          this.props.navigation.setParams({title: "Edit Information or News"})
          this.setState({
            info:val,
            loading:false,
            typePickerList:pickerValues,
          })
        })
      }else if(info!=undefined){
        this.props.navigation.setParams({title: "Edit Information or News"})
        this.setState({
          info:info,
          loading:false,
          typePickerList:pickerValues,
        })
      }else{
        console.log("No info or key found, add a new info")
        this.props.navigation.setParams({title: "Add New Info or News"})
        this.setState({
          info:{
            "eventKey" : "",
            "eventInfo" : "",
            "image" : "",
            "key" : "-1",
            "link" : "",
            "hyperlink" : {
              "link": "",
              "text": ""
            },
            "locationKey" : "",
            "locationInfo" : "",
            "text" : "",
            "title" : "",
            "type" : "news",
            "valid" : true
          },
          "typePickerList":pickerValues,
          loading:false,
        })
      }
    })
    getAllEvents().then((events)=>{
      let eventPicker = []
      for(i=0;i<events.length;i++){
        eventPicker.push( <Picker.Item label={events[i].title} value={events[i].key} key={i} />)
      }
      this.setState({
        eventPickerList:eventPicker
      })
    })
    getEventLocations().then((locations)=>{
      let locationPicker = []
      for(i=0;i<locations.length;i++){
        locationPicker.push( <Picker.Item label={locations[i].title} value={locations[i].key} key={i} />)
      }
      this.setState({
        locationPickerList:locationPicker
      })
    })
  }

  render(){
    return(
      <View>
        {this.state.loading ? <View style={styles.centered}><ActivityIndicator size="large"/></View> :
          <ScrollView>

            <Text style={[styles.titleText,styles.darkText]}>Title:</Text>
            <TextInput  placeholder={'Title'} style={[styles.subText,styles.darkText,{marginLeft:10}]}
            onChangeText={(text)=>this.setState((previousState)=>{previousState.info.title=text;return previousState})}
            value={this.state.info.title}/>

            <Text style={[styles.titleText,styles.darkText]}>Text:</Text>
            <TextInput  placeholder={'Explanation'} style={[styles.subText,styles.darkText,{marginLeft:10}]}
            onChangeText={(text)=>this.setState((previousState)=>{previousState.info.text=text;return previousState})}
            value={this.state.info.text}/>

            <Text style={[styles.titleText,styles.darkText]}>Type:</Text>
            <Picker
              selectedValue={this.state.info.type}
              style={{ flex:1 }}
              onValueChange={(itemValue, itemIndex) =>{
                  this.setState((previousState)=>{
                    previousState.info.type=itemValue
                    return previousState}
                  )}
                }
              >
              {this.state.typePickerList}
            </Picker>

            <Text style={[styles.titleText,styles.darkText]}>Link:</Text>
            
            <Text style={[styles.titleText,styles.darkText]}>Link to open when clicked:</Text>
            <TextInput multiline placeholder={'Opened when clicked, add "tel:" for phone numbers, "mailto:" for emails to the begining, link for bonus and download'}
            style={[styles.subText,styles.darkText,{marginLeft:10,height:100}]}
            onChangeText={(text)=>this.setState((previousState)=>{previousState.info.hyperlink.link=text;
              previousState.info.link=text.replace("tel:","").replace("mailto:","");
              return previousState})}
            value={this.state.info.hyperlink.link}/>

            <Text style={[styles.titleText,styles.darkText]}>Link to display:</Text>
            <TextInput multiline placeholder={'Link displayed to user (not the same with open when clicked), phone number for contacts, link for bonus and download'}
            style={[styles.subText,styles.darkText,{marginLeft:10,height:100}]}
            onChangeText={(text)=>this.setState((previousState)=>{previousState.info.hyperlink.text=text;return previousState})}
            value={this.state.info.hyperlink.text}/>

            <Text style={[styles.titleText,styles.darkText]}>Icon:</Text>
            <TextInput  placeholder={'Upload image to somewhere and copy link here'} style={[styles.subText,styles.darkText,{marginLeft:10}]}
            onChangeText={(text)=>this.setState((previousState)=>{previousState.info.image=text;return previousState})}
            value={this.state.info.image}/>

            <Text style={[styles.titleText,styles.darkText]}>Associated With Event:</Text>
            {(this.state.eventPickerList.length>0) ?
              <View>
                <Picker
                  selectedValue={this.state.info.eventKey}
                  style={{ flex:1 }}
                  onValueChange={(itemValue, itemIndex) =>{
                      if(itemIndex>0) label = this.state.eventPickerList[itemIndex-1].props.label
                      else label = ""
                      this.setState((previousState)=>{
                        previousState.info.eventKey=itemValue
                        previousState.info.eventInfo=label
                        return previousState}
                      )}
                    }
                  >
                  <Picker.Item label={"None"} value={""} key={"-1"} />
                  {this.state.eventPickerList}
                </Picker>
              </View>
              :
              <ActivityIndicator/>
            }

            <Text style={[styles.titleText,styles.darkText]}>Associated With Location:</Text>
            {(this.state.locationPickerList.length>0) ?
              <View>
                <Picker
                selectedValue={this.state.info.locationKey}
                  style={{ flex:1 }}
                  onValueChange={(itemValue, itemIndex) =>{
                      if(itemIndex>0) label = this.state.locationPickerList[itemIndex-1].props.label
                      else label = ""
                      this.setState((previousState)=>{
                        previousState.info.locationKey=itemValue
                        previousState.info.locationInfo=label
                        return previousState}
                      )}
                    }
                  >
                  <Picker.Item label={"None"} value={""} key={"-1"} />
                  {this.state.locationPickerList}
                </Picker>
              </View>
              :
              <ActivityIndicator/>
            }

            <TouchableOpacity onPress={()=>  {writeInfo(this.state.info);this.props.navigation.pop()}} style={styles.bigButton}>
              <Text style={styles.titleText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigation.pop()} style={styles.bigButton}>
              <Text style={styles.titleText}>Cancel</Text>
            </TouchableOpacity>

          </ScrollView>
        }
      </View>
    )
  }

}

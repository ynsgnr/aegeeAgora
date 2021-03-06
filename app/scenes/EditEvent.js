
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, TextInput, Dimensions, Picker, Alert} from 'react-native';

import {getEventByKey, writeEvent, constructDayKey, constructHourKey, getWeekDay} from '../actions/events'
import {getAllLocations} from '../actions/locations'

import LocationDisplay from '../components/locationDisplay'
import TimePicker from '../components/timePicker'

import colors from '../resources/colors'
import styles from '../resources/styles'

 const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Event extends Component {

  //Props avaliable by component props or navigation paramaters
  //component props overwrites Navigation paramaters
  //eventKey overwrites event obect
  static defaultProps = {
    eventKey:"",
    event: undefined,
  }


  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Loading...')
    };
  };

  constructor(props){
    super(props)
    this.state={
      event : undefined,
      eventKey : "",
      loading: true,
      timePickerVisible: false,
    }
  }

  componentDidMount(){
    let eventKey = ""
    let event = undefined
    let startDate = this.props.navigation.getParam("startDate", new Date() )
    let e = new Date()
    e.setHours(e.getHours()+1)
    let endDate = this.props.navigation.getParam("endDate", new Date(e))

    //Get event or eventKey from props or navigation params, props overwrites navigation params
    if(this.props.eventKey=="") eventKey=this.props.navigation.getParam("eventKey", "")
    if(this.props.event==undefined){
      event=this.props.navigation.getParam("event", undefined )
    }else{event=this.props.event}

    //construct location picker
    getAllLocations().then((data)=>{
      let pickerValues = []
      for(i=0;i<data.length;i++){
        pickerValues.push(
          <Picker.Item label={data[i].title} value={data[i].key} key={i} />
        )
      }

      //if there is eventkey, get event from db, eventkey overwrites event object with event object from db
      if(eventKey!=""){
        getEventByKey(eventKey).then( (val) =>{
          this.props.navigation.setParams({title: "Edit Event"})
          if(val.hyperlink==undefined)val.hyperlink={link:'',text:''}
          if(val.image==undefined)val.image=''
          this.setState({
            event:val,
            loading:false,
            locationPickerList:pickerValues,
          })
        })
      }else if(event!=undefined){
        this.props.navigation.setParams({title: "Edit Event"})
        if(event.hyperlink==undefined)event.hyperlink={link:'',text:''}
        if(event.image==undefined)event.image=''
        this.setState({
          event:event,
          loading:false,
          locationPickerList:pickerValues,
        })
      }else{
        //No event or key found, add a new event
        this.props.navigation.setParams({title: "Add New Event"})
        this.setState({
          event:{
            "description" : "",
            "endDate" : endDate,
            "key" : "-1",
            "location" : "0",
            "locationInfo" : data[0].title,
            "startDate" : startDate,
            "title" : "",
            "valid" : true,
            "hyperlink":{
              "link":"",
              "text":""
            },
            "image":""
          },
          "locationPickerList":pickerValues,
          loading:false,
        })
      }
    })
  }

  render() {
    return (
      <View>
        {this.state.loading ? <View style={styles.centered}><ActivityIndicator size="large"/></View> :
          <View>
            <TimePicker visible={this.state.timePickerVisible}
              beginDate={this.state.event.startDate}
              endDate={this.state.event.endDate}
              done={(begin,end)=>{
                this.setState((previousState)=>{
                  if(begin<end){
                    previousState.event.startDate=begin
                    previousState.event.endDate=end
                    previousState.timePickerVisible=false
                  }else{
                    Alert.alert(
                      'Check Dates',
                      'Begin date can not be bigger than end date',
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      {cancelable: true},
                    );
                  }
                  previousState.timePickerVisible=false
                  return previousState
                })
              }}/>
            <ScrollView>

              <Text style={[styles.titleText,styles.darkText]}>Title:</Text>
              <TextInput  placeholder={'Title'} style={[styles.subText,styles.darkText,{marginLeft:10}]}
              onChangeText={(text)=>this.setState((previousState)=>{previousState.event.title=text;return previousState})}
              value={this.state.event.title}/>

              <View style={{alignItems:'center', justifyContent: 'center', height:250,}}>
                <TouchableOpacity onPress={()=>this.setState({timePickerVisible:true})}  style={style.dateTimeDisplay}>
                    <View style={style.smallSide}>
                      <Text style={[styles.titleText,styles.darkText]}>{"\n"+constructHourKey(this.state.event.startDate)}</Text>
                      <View style={style.shapeContainer}>
                        <View style={style.midLineInvisible}/>
                        <View style={styles.littleCircle}/>
                        <View style={style.midLine}/>
                      </View>
                      <Text style={[styles.titleText,styles.darkText]}>{constructDayKey(this.state.event.startDate)+"\n"+getWeekDay(this.state.event.startDate)}</Text>
                    </View>
                  <View style={style.midLine}/>
                  <View style={style.smallSide}>
                    <Text style={[styles.titleText,styles.darkText]}>{"\n"+constructHourKey(this.state.event.endDate)}</Text>
                    <View style={style.shapeContainer}>
                      <View style={style.midLine}/>
                      <View style={styles.littleCircle}/>
                      <View style={style.midLineInvisible}/>
                    </View>
                    <Text style={[styles.titleText,styles.darkText]}>{constructDayKey(this.state.event.endDate)+"\n"+getWeekDay(this.state.event.endDate)}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Text style={[styles.titleText,styles.darkText]}>Location:</Text>
              <Picker
                selectedValue={this.state.event.location}
                style={{ flex:1 }}
                onValueChange={(itemValue, itemIndex) =>{
                    this.setState((previousState)=>{
                      previousState.event.location=itemValue
                      previousState.event.locationInfo=this.state.locationPickerList[itemIndex].props.label
                      return previousState}
                    )}
                  }
                >
                {this.state.locationPickerList}
              </Picker>
              <Text style={[styles.subText,styles.darkText,{marginLeft:10}]}>{this.state.event.locationInfo}</Text>
              <LocationDisplay locationKey={this.state.event.location.toString()} onPress={()=>this.props.navigation.push("EditLocationPage",{locationKey:this.state.event.location.toString()})} height={100}/>

              <View style={styles.startOriented}>
                <Text style={[styles.titleText,styles.darkText]}>Description:</Text>
                <View style={styles.longTextWrapper}>
                  <TextInput multiline placeholder={'Description'} style={[styles.subText,styles.darkText,{marginLeft:10,width:SCREEN_WIDTH*0.8}]}
                  onChangeText={(text)=>this.setState((previousState)=>{previousState.event.description=text;return previousState})}
                  value={this.state.event.description}
                  />
                </View>
              </View>

              <Text style={[styles.titleText,styles.darkText]}>Link:</Text>
            
              <Text style={[styles.titleText,styles.darkText]}>Link to open when clicked:</Text>
              <TextInput placeholder={'Opened when clicked to button'}
              style={[styles.subText,styles.darkText,{marginLeft:10}]}
              onChangeText={(text)=>this.setState((previousState)=>{previousState.event.hyperlink.link=text;return previousState})}
              value={this.state.event.hyperlink.link}/>

              <Text style={[styles.titleText,styles.darkText]}>Link to display:</Text>
              <TextInput placeholder={'Button text'}
              style={[styles.subText,styles.darkText,{marginLeft:10}]}
              onChangeText={(text)=>this.setState((previousState)=>{previousState.event.hyperlink.text=text;return previousState})}
              value={this.state.event.hyperlink.text}/>

              <Text style={[styles.titleText,styles.darkText]}>Image:</Text>
              <TextInput  placeholder={'Image link to display'} style={[styles.subText,styles.darkText,{marginLeft:10}]}
              onChangeText={(text)=>this.setState((previousState)=>{previousState.event.image=text;return previousState})}
              value={this.state.event.image}/>

              <View style={{flex:1,flexDirection:"row"}}>
              <TouchableOpacity onPress={()=>  {writeEvent(this.state.event);this.props.navigation.pop()}} style={styles.bigButton}>
                <Text style={styles.titleText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.props.navigation.pop()} style={styles.bigButton}>
                <Text style={styles.titleText}>Cancel</Text>
              </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        }
      </View>
    );
  }

}

const style =  StyleSheet.create({
  dateTimeDisplay:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    padding:10,
    paddingTop:0
  },
  smallSide:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
  midLine:{
    flex:1,
    backgroundColor: colors.ligthGrey,
    borderColor:colors.ligthGrey,
    height:1,
  },
  midLineInvisible:{
    flex:1,
    height:1,
  },
  shapeContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
})

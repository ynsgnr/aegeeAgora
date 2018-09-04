
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, TextInput, Dimensions} from 'react-native';

import {getEventByKey, writeEvent, constructDayKey, constructHourKey, getWeekDay} from '../actions/events'

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

  componentWillUnmount(){
    //Add alarm
    writeEvent(this.state.event)
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
      editMode: false,
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

    //if there is eventkey, get event from db, eventkey overwrites event object with event object from db
    if(eventKey!=""){
      getEventByKey(eventKey).then( (val) =>{
        this.props.navigation.setParams({title: "Edit Event"})
        this.props.navigation.setParams({eventName: val.title})
        this.setState({
          event:val,
          loading:false,
        })
      })
    }else if(event!=undefined){
      this.props.navigation.setParams({title: "Edit Event"})
      this.props.navigation.setParams({eventName: event.title})
      this.setState({
        event:event,
        loading:false,
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
          "locationInfo" : " ",
          "startDate" : startDate,
          "title" : "",
          "valid" : true,
        },
        loading:false,
      })
    }
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
                  }
                  //Show a toast
                  previousState.timePickerVisible=false
                  return previousState
                })
              }}/>
            <ScrollView>

              <Text style={[styles.titleText,styles.darkText]}>Title:</Text>
              <TextInput  placeholder={'Title'} style={[styles.subText,styles.darkText,{marginLeft:10}]} onChangeText={(text)=>this.setState((previousState)=>{previousState.event.title=text;return previousState})}/>

              <View style={{alignItems:'center', justifyContent: 'center', height:250,}}>
                <TouchableOpacity onPress={()=>this.setState({timePickerVisible:true})}  style={style.dateTimeDisplay}>
                    <View style={style.smallSide}>
                      <Text style={[styles.titleText,styles.darkText]}>{constructHourKey(this.state.event.startDate)}</Text>
                      <View style={style.shapeContainer}>
                        <View style={style.midLineInvisible}/>
                        <View style={styles.littleCircle}/>
                        <View style={style.midLine}/>
                      </View>
                      <Text style={[styles.titleText,styles.darkText]}>{constructDayKey(this.state.event.startDate)+" "+getWeekDay(this.state.event.startDate)}</Text>
                    </View>
                  <View style={style.midLine}/>
                  <View style={style.smallSide}>
                    <Text style={[styles.titleText,styles.darkText]}>{constructHourKey(this.state.event.endDate)}</Text>
                    <View style={style.shapeContainer}>
                      <View style={style.midLine}/>
                      <View style={styles.littleCircle}/>
                      <View style={style.midLineInvisible}/>
                    </View>
                    <Text style={[styles.titleText,styles.darkText]}>{constructDayKey(this.state.event.endDate)+" "+getWeekDay(this.state.event.endDate)}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Text style={[styles.titleText,styles.darkText]}>Location</Text>
              <Text style={[styles.subText,styles.darkText,{marginLeft:10}]}>{this.state.event.locationInfo}</Text>
              <LocationDisplay onPress={()=>this.props.navigation.push("LocationPage",{locationKey:this.state.event.location.toString()})} locationKey={this.state.event.location.toString()} height={100}/>

              <View style={styles.startOriented}>
                <Text style={[styles.titleText,styles.darkText]}>Description:</Text>
                <View style={styles.longTextWrapper}>
                  <TextInput multiline placeholder={'Description'} style={[styles.subText,styles.darkText,{marginLeft:10,width:SCREEN_WIDTH*0.8}]} onChangeText={(text)=>this.setState((previousState)=>{previousState.event.description=text;return previousState})}/>
                </View>
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
    centered:'space-around',
    alignItems:'center',
    padding:10
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

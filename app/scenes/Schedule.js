
import React, {Component} from 'react';
import {Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Animated, Dimensions} from 'react-native';

import { NavigationEvents } from 'react-navigation';

import {CalendarList} from 'react-native-calendars';

import firebase from 'react-native-firebase';

//Resources
import styles from '../resources/styles'
import colors from '../resources/colors'

//Components
import NavBar from '../components/navBar'
import ScheduleList from '../components/scheduleList'

//Actions
import {constructDayKey, constructHourKey, getWeekDay, constructReverseDayKey, getAllEventsByDay} from '../actions/events'

const title = "Schedule"

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Schedule extends Component {

  static defaultProps = {
    minDayPickerHeigth:50,
    duration:400,
    maxDayPickerHeigth:SCREEN_HEIGHT*0.65,
  }

  constructor(props){
    super(props)
    this.state={
      eventList : {},
      loading : true,
      currentDay: new Date(),
      expanded:true,
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  componentDidMount(){
    getAllEventsByDay().then((dayList) => {
      this.setState({
        eventList:dayList,
        loading:false,
      },()=>{
        this.sleep(800).then(()=>{
          this.scrolView.scrollTo({x:0,y:(this.props.maxDayPickerHeigth-this.props.minDayPickerHeigth),animated:true})
          this.setState({expanded:false})
        })}
      )
    })
  }

  refresh(){
    getAllEventsByDay().then((dayList) => {
      this.setState({
        eventList:dayList,
      })
    })
  }

  renderDays(){
    let d=new Date(this.state.currentDay);
    if(this.state.eventList[constructDayKey(d)]==undefined){
      return (
        <View  style={[styles.centered,{flex:1}]}>
          <Text style={[{fontSize:20}]}>No Events Today</Text>
        </View>
      )
    }
    return (
      <ScheduleList navigation={this.props.navigation} events={this.state.eventList[constructDayKey(d)]} key={i} editMode={!firebase.auth().currentUser.toJSON().isAnonymous}/>
    )
  }

  toggleCalendar(){
    if(this.state.expanded){
      //Shrink
      this.scrolView.scrollTo({x:0,y:(this.props.maxDayPickerHeigth-this.props.minDayPickerHeigth),animated:true})
      this.setState({expanded:false})
    }else{
      //Expand
      this.scrolView.scrollTo({x:0,y:0,animated:true})
      this.setState({expanded:true})
    }
  }

  checkIfToggle(event){
    if(event.nativeEvent.contentOffset.y<(this.props.maxDayPickerHeigth-this.props.minDayPickerHeigth)){
      if(event.nativeEvent.velocity.y>0){
        //Expand
        this.scrolView.scrollTo({x:0,y:0,animated:true})
        this.setState({expanded:true})
      }else{
        //Shrink
        this.scrolView.scrollTo({x:0,y:(this.props.maxDayPickerHeigth-this.props.minDayPickerHeigth),animated:true})
        this.setState({expanded:false})
      }

    }
  }

  getMarkedDates(){
    let key = constructReverseDayKey(this.state.currentDay)
    let val = {}
    val[key]={selected:true}
    return val
  }

  render() {
    return (
      <View>
        <NavigationEvents onWillFocus={payload => this.refresh()} />
        <NavBar title={title} navigation={this.props.navigation} rigthButton={firebase.auth().currentUser && firebase.auth().currentUser.email} onRigthButtonPress={()=>this.props.navigation.push('EditEventPage')}/>
        <ScrollView ref={(c)=>this.scrolView=c} style={styles.body} onScrollEndDrag={(scrol)=>this.checkIfToggle(scrol)}>
          {this.state.loading ? <View style={styles.centered}><ActivityIndicator size="large"/></View> :
            <View>
              <View style={{flexDirection:'column'}}>
                <View style={{height:this.props.maxDayPickerHeigth-this.props.minDayPickerHeigth,backgroundColor:colors.white}}>
                  <CalendarList style={{height:this.props.maxDayPickerHeigth-this.props.minDayPickerHeigth,backgroundColor:colors.white}}
                  horizontal
                  pagingEnabled
                  hideArrows={false}
                  current={constructReverseDayKey(this.state.currentDay)}
                  onDayPress={(day) => {
                    let currentDay = new Date()
                    currentDay.setYear(day.year)
                    currentDay.setDate(day.day)
                    currentDay.setMonth(day.month-1)
                    this.setState({currentDay:currentDay})
                    this.toggleCalendar()
                  }}
                  markedDates={this.getMarkedDates()}/>
                </View>
                <View style={[styles.daySelector,{height:this.props.minDayPickerHeigth}]}>
                  <TouchableOpacity onPress={()=>this.setState(previousState=>{
                    let currentDay = new Date(previousState.currentDay)
                    currentDay.setDate(currentDay.getDate()-1)
                    return (
                      {currentDay:currentDay}
                    )
                  })}>
                    <Text style={styles.leftArrow}> {'<'} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.toggleCalendar()}>
                    <Text style={[styles.daySelectorText,{flex:2}]}>{constructDayKey(this.state.currentDay)+" "+getWeekDay(this.state.currentDay)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.setState(previousState=>{
                    let currentDay = new Date(previousState.currentDay)
                    currentDay.setDate(currentDay.getDate()+1)
                    return (
                      {currentDay:currentDay}
                    )
                  })}>
                    <Text style={[styles.rightArrow]}> {'>'} </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{height:SCREEN_HEIGHT,width:1}}/>
                {this.renderDays()}
              </View>
            </View>
          }
        </ScrollView>
      </View>
    );
  }

}

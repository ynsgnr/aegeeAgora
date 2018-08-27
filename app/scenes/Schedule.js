
import React, {Component} from 'react';
import {Text, View, ActivityIndicator, ScrollView,TouchableOpacity} from 'react-native';

//Resources
import styles from '../resources/styles'

//Components
import NavBar from '../components/navBar'
import ScheduleList from '../components/scheduleList'

//Actions
import {getAllEvents} from '../actions/events'

const title = "Schedule"

export default class Schedule extends Component {

  constructor(props){
    super(props)
    this.state={
      minDate: new Date(),
      maxDate: new Date(),
      eventList : {},
      loading : true,
      currentDay: new Date(),
      dayCount:0,
    }
  }

  constructDayKey(d){
    let timeString = "";
        if (d.getDate()<10){
      timeString=timeString+"0"+d.getDate()
    }else{
      timeString=timeString+d.getDate()
    }
    timeString=timeString+"-"
    if (d.getMonth()<9){
      timeString=timeString+"0"+(d.getMonth()+1)
    }else{
      timeString=timeString+(d.getMonth()+1)
    }
    timeString=timeString+"-"+d.getFullYear()
    return timeString
  }

  constructHourKey(d){
    let timeString = "";
    if (d.getHours()<10){
      timeString=timeString+"0"+d.getHours()
    }else{
      timeString=timeString+d.getHours()
    }
    timeString=timeString+":"
    if (d.getMinutes()<10){
      timeString=timeString+"0"+d.getMinutes()
    }else{
      timeString=timeString+d.getMinutes()
    }
    return timeString
  }

  componentDidMount(){
    getAllEvents().then( (val) => {
      //Order by day?
      let dayList={}
      let maxDate=new Date(0)
      let minDate=new Date()
      minDate.setYear(2050)
      for(i=0;i<val.length;i++){
        val[i].startDate = new Date(val[i].startDate)
        val[i].endDate = new Date(val[i].endDate)

        if(val[i].startDate>maxDate) maxDate=val[i].startDate
        if(val[i].startDate<minDate) minDate=val[i].startDate

        let dayKey = this.constructDayKey(val[i].startDate)

        if(dayList[dayKey]==undefined) dayList[dayKey]={}

        let hourKey = this.constructHourKey(val[i].startDate)

        if(dayList[dayKey][hourKey]==undefined) dayList[dayKey][hourKey]=[]
        dayList[dayKey][hourKey].push(val[i])
      }
      maxDate.setHours(23, 59, 59, 99)
      minDate.setHours(0, 0, 0, 0)
      let dayCount = Math.abs(this.state.maxDate-this.state.minDate)/86400000
      this.setState({
        minDate:minDate,
        maxDate:maxDate,
        eventList:dayList,
        loading:false,
        dayCount:dayCount,
      })
    })
  }

  renderDays(){
    let d=new Date(this.state.currentDay);
    if(d<this.state.minDate || d>this.state.maxDate){
      return (
        <View  style={styles.centered}>
          <Text style={[{fontSize:20}]}>No Events Today</Text>
        </View>
      )
    }
    return (
      <ScheduleList events={this.state.eventList[this.constructDayKey(d)]} key={i}/>
    )
  }

  getWeekDay(d){
    switch(d.getDay()){
      case 0:
        return "Sunday"
      case 1:
        return "Monday"
      case 2:
        return "Tuesday"
      case 3:
        return "Wednesday"
      case 4:
        return "Thursday"
      case 5:
        return "Friday"
      case 6:
        return "Saturday"
    }
  }

  render() {
    return (
      <View>
        <NavBar title={title}/>
        <ScrollView style={styles.body}>
          {this.state.loading ? <ActivityIndicator size="large"/> :
            <View>
              <View style={styles.daySelector}>
                <TouchableOpacity style={{padding:20}} onPress={()=>this.setState(previousState=>{
                  let currentDay = new Date(previousState.currentDay)
                  currentDay.setDate(currentDay.getDate()-1)
                  return (
                    {currentDay:currentDay}
                  )
                })}>
                  <Text style={styles.leftArrow}> {'<'} </Text>
                </TouchableOpacity>
                <Text style={[styles.daySelectorText,{flex:2}]}>{this.constructDayKey(this.state.currentDay)+" "+this.getWeekDay(this.state.currentDay)}</Text>
                <TouchableOpacity style={{padding:20}} onPress={()=>this.setState(previousState=>{
                  let currentDay = new Date(previousState.currentDay)
                  currentDay.setDate(currentDay.getDate()+1)
                  return (
                    {currentDay:currentDay}
                  )
                })}>
                  <Text style={[styles.rightArrow]}> {'>'} </Text>
                </TouchableOpacity>
              </View>
              {this.renderDays()}
            </View>
          }
        </ScrollView>
      </View>
    );
  }

}

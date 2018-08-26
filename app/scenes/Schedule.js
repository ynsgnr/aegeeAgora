
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, ScrollView} from 'react-native';

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
      loading : true
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
        if(val[i].startDate>maxDate) maxDate=val[i].startDate
        if(val[i].startDate<minDate) minDate=val[i].startDate

        let dayKey = this.constructDayKey(val[i].startDate)

        if(dayList[dayKey]==undefined) dayList[dayKey]={}

        let hourKey = this.constructHourKey(val[i].startDate)

        if(dayList[dayKey][hourKey]==undefined) dayList[dayKey][hourKey]=[]
        dayList[dayKey][hourKey].push(val[i])
      }
      this.setState({
        minDate:minDate,
        maxDate:maxDate,
        eventList:dayList,
        loading:false,
      })
    })
  }

  renderDays(){
    let dayCount = Math.abs(this.state.maxDate-this.state.minDate)/86400000
    let renderArray=[]
    let d=new Date(this.state.minDate);
    for(i=0;i<dayCount;i++){
      renderArray.push(<ScheduleList events={this.state.eventList[this.constructDayKey(d)]} key={i}/>)
      d.setDate(d.getDate+1)
    }
    return renderArray
  }

  render() {
    return (
      <View>
        <NavBar title={title}/>
        <ScrollView style={styles.body}>
          {this.state.loading ? <ActivityIndicator size="large"/> :
            this.renderDays()
          }
        </ScrollView>
      </View>
    );
  }
}

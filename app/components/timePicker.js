import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
  TextInput,
  ActivityIndicator
} from 'react-native';

import styles from '../resources/styles';

import { CalendarList } from 'react-native-calendars';

import colors from '../resources/colors'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCROLLSTEPHEIGHT = 35
const PICKEDOFFSET = 10 //TODO check on different sizes

export default class TimePicker extends Component{

  DURATION=400

  static defaultProps = {
    beginDate:new Date(),
    endDate:new Date(),
    pickedDateColor:colors.background,
    done:(begin,end)=>{console.log("Dates Picked "+begin+" - "+end)},
    visible:false,
  }

  constructor(props) {
    super(props);
    this.state = {
      datesSelected: null,
      pickingTime:false,
      markedDates: null,
      loading:true,
      bHour:0,
      bMin:0,
      eHour:0,
      eMin:0,
      beginDay:{
        day:1,
        month:1,
        year:1970,
        dateString:'1970-01-01',
        timestamp:0,
      },
      endDay:{
        day:1,
        month:1,
        year:1970,
        dateString:'1970-01-01',
        timestamp:0,
      },
    }
  }

  componentDidMount(){
    this.hours=[]
    this.hours.push(
      <View key={-2} style={[{height:SCROLLSTEPHEIGHT}]}/>
    )
    this.hours.push(
      <View key={-1} style={[{height:SCROLLSTEPHEIGHT}]}/>
    )
    for (i=0;i<=24;i++){
      hour=(
        <Text key={i} style={[{height:SCROLLSTEPHEIGHT},styles.timeScrollText]}>{i}</Text>
        )
      this.hours.push(hour)
    }
    this.hours.push(
      <View key={25} style={[{height:SCROLLSTEPHEIGHT}]}/>
    )
    this.hours.push(
      <View key={26} style={[{height:SCROLLSTEPHEIGHT}]}/>
    )
    this.minutes=[]
    this.minutes.push(
      <View key={-2} style={[{height:SCROLLSTEPHEIGHT}]}/>
    )
    this.minutes.push(
      <View key={-1} style={[{height:SCROLLSTEPHEIGHT}]}/>
    )
    for (i=0;i<=60;i++){
      minute=(
        <Text key={i} style={[{height:SCROLLSTEPHEIGHT},styles.timeScrollText]}>{i}</Text>
      )
      this.minutes.push(minute)
    }
    this.minutes.push(
      <View key={61} style={[{height:SCROLLSTEPHEIGHT}]}/>
    )
    this.minutes.push(
      <View key={62} style={[{height:SCROLLSTEPHEIGHT}]}/>
    )
    this.setState({
      loading:false
    })
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    d = nextProps.beginDate
    b = nextProps.endDate
    bDateS = ''
    eDateS = ''
    if (nextProps.endDate==undefined) {
      b.setHours(d.getHours()+2)
    }else{//WHY??
      yy=d.getFullYear()
      dd=d.getDate()
      mm=d.getMonth()+1
      bDateS=yy
      if(mm<10)
        bDateS=bDateS+'-0'+mm
      else
        bDateS=bDateS+'-'+mm
      if(dd<10)
        bDateS=bDateS+'-0'+dd
      else
        bDateS=bDateS+'-'+dd
      yy=d.getFullYear()
      dd=d.getDate()
      mm=d.getMonth()+1
      eDateS=yy
      if(mm<10)
        eDateS=eDateS+'-0'+mm
      else
        eDateS=eDateS+'-'+mm
      if(dd<10)
        eDateS=eDateS+'-0'+dd
      else
        eDateS=eDateS+'-'+dd
    }
    this.setState({
      loading:false,
      bHour:d.getHours(),
      bMin:d.getMinutes(),
      eHour:b.getHours(),
      eMin:b.getMinutes(),
      beginDay:{
        day:d.getDate(),
        month:d.getMonth()+1,
        year:d.getFullYear(),
        dateString:bDateS,
        timestamp:d.getTime()
      },
      endDay:{
        day:b.getDate(),
        month:b.getMonth()+1,
        year:b.getFullYear(),
        dateString:eDateS,
        timestamp:b.getTime()
      },
    },()=>this.scrollToState())
  }

  onScrollbHour(){
    i=Math.round(this.bhscrollOffset/SCROLLSTEPHEIGHT)
    this.bHourScroll.scrollTo({x:0, y:(i*SCROLLSTEPHEIGHT)-PICKEDOFFSET, animated:true})
    this.setState({bHour:i-1})
  }

  onScrollbMin(){
    i=Math.round(this.bmscrollOffset/SCROLLSTEPHEIGHT)
    this.bMinScroll.scrollTo({x:0, y:(i*SCROLLSTEPHEIGHT)-PICKEDOFFSET, animated:true})
    this.setState({bMin:i-1})
  }

  onScrolleMin(){
    i=Math.round(this.emscrollOffset/SCROLLSTEPHEIGHT)
    this.eMinScroll.scrollTo({x:0, y:(i*SCROLLSTEPHEIGHT)-PICKEDOFFSET, animated:true})
    this.setState({eMin:i-1})
  }

  onScrolleHour(){
    i=Math.round(this.ehscrollOffset/SCROLLSTEPHEIGHT)
    this.eHourScroll.scrollTo({x:0, y:(i*SCROLLSTEPHEIGHT)-PICKEDOFFSET, animated:true})
    this.setState({eHour:i-1})
  }

  onAllDay(){
    this.bHourScroll.scrollTo({x:0, y:(1*SCROLLSTEPHEIGHT)-PICKEDOFFSET, animated:true})
    this.bMinScroll.scrollTo({x:0, y:(1*SCROLLSTEPHEIGHT)-PICKEDOFFSET, animated:true})
    this.eMinScroll.scrollTo({x:0, y:(61*SCROLLSTEPHEIGHT)-PICKEDOFFSET, animated:true})
    this.eHourScroll.scrollTo({x:0, y:(25*SCROLLSTEPHEIGHT)-PICKEDOFFSET, animated:true})
  }

  scrollToState(){
    if(this.bHourScroll) this.bHourScroll.scrollTo({x:0, y:((this.state.bHour+1)*SCROLLSTEPHEIGHT)-PICKEDOFFSET, animated:true})
    if(this.bMinScroll) this.bMinScroll.scrollTo({x:0, y:((this.state.bMin+1)*SCROLLSTEPHEIGHT)-PICKEDOFFSET, animated:true})
    if(this.eMinScroll) this.eMinScroll.scrollTo({x:0, y:((this.state.eMin+1)*SCROLLSTEPHEIGHT)-PICKEDOFFSET, animated:true})
    if(this.eHourScroll) this.eHourScroll.scrollTo({x:0, y:((this.state.eHour+1)*SCROLLSTEPHEIGHT)-PICKEDOFFSET, animated:true})
  }

  saveAndclose(){
    this.setState({loaded:false})
    beginDay = new Date(this.state.beginDay.timestamp)
    beginDay.setHours(this.state.bHour)
    beginDay.setMinutes(this.state.bMin)

    endDay = new Date(this.state.endDay.timestamp)
    endDay.setHours(this.state.eHour)
    endDay.setMinutes(this.state.eMin)

    this.props.done(beginDay,endDay)
  }

  markDates(day){
    console.log(day);
      markedDates={
        [day.dateString]: {startingDay: true, endingDay: true, color:this.props.pickedDateColor}
      }
        this.setState({markedDates: markedDates, beginDay: day, endDay:day},
          ()=>this.saveAndclose())
  }

  clock(){
    return (
      <View>
        <View style={[styles.timePage]}>
          <View style={[styles.timePickerDetails]}>
            <ScrollView ref={(c) => this.bHourScroll = c}
            onScroll={(event)=>this.bhscrollOffset=event.nativeEvent.contentOffset.y}
            onMomentumScrollEnd={() => this.onScrollbHour()}
            showsVerticalScrollIndicator={false} pagingEnabled={true}>
              {this.hours}
            </ScrollView>
            <Text style={[{height:SCROLLSTEPHEIGHT, fontSize:25}]}>:</Text>
            <ScrollView
            ref={(c) => this.bMinScroll = c}
            onScroll={(event)=>this.bmscrollOffset=event.nativeEvent.contentOffset.y}
            onMomentumScrollEnd={() => this.onScrollbMin()}
            showsVerticalScrollIndicator={false} pagingEnabled={true}>
              {this.minutes}
            </ScrollView>
          </View>
          <Text style={[{fontSize:25}]}>-</Text>
          <View style={[styles.timePickerDetails]}>
            <ScrollView
            ref={(c) => this.eHourScroll = c}
            onScroll={(event)=>this.ehscrollOffset=event.nativeEvent.contentOffset.y}
            onMomentumScrollEnd={() => this.onScrolleHour()}
            showsVerticalScrollIndicator={false} pagingEnabled={true}>
              {this.hours}
            </ScrollView>
            <Text style={[{fontSize:25}]}>:</Text>
            <ScrollView
            ref={(c) => this.eMinScroll = c}
            onScroll={(event)=>this.emscrollOffset=event.nativeEvent.contentOffset.y}
            onMomentumScrollEnd={() => this.onScrolleMin()}
            showsVerticalScrollIndicator={false} pagingEnabled={true}>
              {this.minutes}
            </ScrollView>
          </View>
          <TouchableOpacity onPress={()=>this.onAllDay()} style={[styles.smallLightButton]}>
            <Text>All</Text>
            <Text>Day</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render(){
    return (
      <Modal animationType='fade' onShow={()=>{this.scrollToState();}} hardwareAccelerated={true} onRequestClose={() => this.saveAndclose()} transparent={true} visible={this.props.visible}>
        { this.state.loading ? <ActivityIndicator/> :
          <View style={[styles.fullModalPage]}>
            <View style={[styles.timePickerContainer]}>
              {this.clock()}
              <View style={[styles.calendarContainer]}>
                  <CalendarList
                  style={[{backgroundColor:'transparent'}]}
                  current={this.state.beginDay.dateString}
                  onDayPress={(day)=>this.markDates(day)}
                  markingType={'period'}
                  markedDates={this.state.markedDates}
                  />
              </View>
              <TouchableOpacity onPress={()=>this.saveAndclose()} style={[ styles.smallLightButton, {width:SCREEN_WIDTH*0.9, padding:15}]}>
                <Text>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </Modal>
    )
  }
}

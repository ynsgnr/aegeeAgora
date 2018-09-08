
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView} from 'react-native';

import {getEventByKey, constructDayKey, constructHourKey, getWeekDay} from '../actions/events'
import {getNewsByEvent} from '../actions/info'

import LocationDisplay from '../components/locationDisplay'
import NewsList from '../components/newsList'

import colors from '../resources/colors'
import styles from '../resources/styles'

export default class Event extends Component {

  //Props avaliable by component props or navigation paramaters
  //component props overwrites Navigation paramaters
  //eventKey overwrites event obect
  static defaultProps = {
    eventKey:"",
    event: undefined,
    news: [],
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('eventName', 'Loading...')
    };
  };

  constructor(props){
    super(props)
    this.state={
      event : {},
      eventKey : "",
      loading: true,
    }
  }

  componentDidMount(){
    let eventKey = ""
    let event = {}

    //Get event or eventKey from props or navigation params, props overwrites navigation params
    if(this.props.eventKey=="") eventKey=this.props.navigation.getParam("eventKey", "")
    if(this.props.event==undefined){
      event=this.props.navigation.getParam("event", undefined )
    }else{event=this.props.event}

    //if there is eventkey, get event from db, eventkey overwrites event object with event object from db
    if(eventKey!=""){
      getEventByKey(eventKey).then( (val) =>{
        this.props.navigation.setParams({eventName: val.title})
        val.startDate=new Date(val.startDate)
        val.endDate=new Date(val.endDate)
        this.setState({
          event:val,
          loading:false,
        })
        getNewsByEvent(val.key).then((news)=>{
          this.setState({
            news:news
          })
        })
      })
    }else if(event!=undefined){
      this.props.navigation.setParams({eventName: event.title})
      this.setState({
        event:event,
        loading:false,
      })
      getNewsByEvent(event.key).then((news)=>{
        this.setState({
          news:news
        })
      })
    }else{
      console.log("Please give eventKey or event object as props to Event page");
    }
  }

  render() {
    return (
      <View>
        {this.state.loading ? <View style={styles.centered}><ActivityIndicator size="large"/></View> :
          <ScrollView>
            <View style={{alignItems:'center', justifyContent: 'center', height:250,}}>
              <View style={style.dateTimeDisplay}>
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
              </View>
            </View>

            <Text style={[styles.titleText,styles.darkText]}>Location</Text>
            <Text style={[styles.subText,styles.darkText,{marginLeft:10}]}>{this.state.event.locationInfo}</Text>
            <LocationDisplay onPress={()=>this.props.navigation.push("LocationPage",{locationKey:this.state.event.location.toString()})} locationKey={this.state.event.location.toString()} height={100}/>

            {this.state.event.description!=undefined && this.state.event.description!="" &&
              <View style={styles.startOriented}>
                <Text style={[styles.titleText,styles.darkText]}>Description</Text>
                <View style={styles.longTextWrapper}>
                  <Text style={styles.subText}>{this.state.event.description}</Text>
                </View>
              </View>
            }

            {this.state.news && this.state.news.length>0 &&
              <View>
                  <Text style={[styles.titleText,styles.darkText]}>News About This Event:</Text>
                  <NewsList news={this.state.news} navigation={this.props.navigation}/>
              </View>
            }

          </ScrollView>
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

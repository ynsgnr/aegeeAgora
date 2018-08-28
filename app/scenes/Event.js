
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';

import {getEventByKey} from '../actions/events'

const title = "Event"

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
      event=this.props.navigation.getParam("event", {} )
    }else{event=this.props.event}

    //if there is eventkey, get event from db, eventkey overwrites event object with event object from db
    if(eventKey!=""){
      getEventByKey(eventKey).then( (val) =>{
        this.props.navigation.setParams({eventName: val.title})
        this.setState({
          event:val,
          loading:false,
        })
      })
    }else if(event!={}){
      this.props.navigation.setParams({eventName: event.title})
      this.setState({
        event:event,
        loading:false,
      })
    }else{
      console.log("Please give eventKey or event object as props to Event page");
    }
  }

  render() {
    return (
      <View>
        {this.state.loading ? <ActivityIndicator size="large"/> :
          <Text>{this.state.event.title}</Text>
        }
      </View>
    );
  }

}

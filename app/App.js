
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator,createStackNavigator,createSwitchNavigator } from 'react-navigation';

import Schedule from './scenes/Schedule';
import Map from './scenes/Map';
import Info from './scenes/Info';
import News from './scenes/News';

import Location from './scenes/Location';
import Event from './scenes/Event'

//Stack navigation for event and location pages
const EventLocationStack = createStackNavigator (
  {
    Event:Event,
    Location:Location,
  },
)

//Tab Navigator:
const TabNavigator = createBottomTabNavigator(
  {
    Schedule: {
      screen: Schedule
    },
    Map:{
      screen:Map
    },
    Info:{
      screen:Info
    },
    News:{
      screen:News
    }
  },
  {
    initialRouteName : 'Schedule', //Starting screen
  }
);

//Combine stack and tab navigations
const RootNavigator = createSwitchNavigator (
  {
    Home:TabNavigator,
    EventLocationPage: EventLocationStack
  },
  {
    initialRouteName: 'Home'
  }
)

/*Navigation functions (use only in scenes):

//Navigating:
this.props.navigation.navigate('RouteName', { params go here }) //Go to page, if you are on the page do nothing
this.props.navigation.push('RouteName', {  params go here }) //Add page to stack, can load multiple times with data
this.props.navigation.goBack() //Go back

//Get params:
this.props.navigation.getParam(paramName, defaultValue) //read params within route

//Application state data passing:
//Navigation reads required values from this variable add it to the page
static navigationOptions = {
  title: '',
}
//if you want to use params for navigation options:
static navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('otherParam', 'A Nested Details Screen'),
  };
};
this.props.navigation.setParams({otherParam: 'Updated!'}) //Update navigation options from mounted screen


*/

export default class App extends React.Component {
  render() {
    return <RootNavigator />;
  }
}

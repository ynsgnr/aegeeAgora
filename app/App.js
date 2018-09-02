
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';

import firebase from 'react-native-firebase';

//Tab Scenes
import Schedule from './scenes/Schedule';
import Map from './scenes/Map';
import Info from './scenes/Info';
import News from './scenes/News';

//Standalone scenes
import Location from './scenes/Location';
import Event from './scenes/Event'
import Auth from './scenes/Auth'
import Admin from './scenes/Admin'

//import {resetDatabase} from './actions/write' //Used for injecting mock data to db

//Tab Navigator:
const TabNavigator = createBottomTabNavigator(
  {
    Schedule: {
      screen: Schedule,
      navigationOptions: ({ navigation }) => ({
          title: 'Schedule',
        }),
    },
    Map:{
      screen:Map,
    },
    Info:{
      screen:Info,
    },
    News:{
      screen:News,
    }
  },
  {
    initialRouteName : 'Schedule', //Starting screen
  }
);

//Combine stack and tab navigations
const RootNavigator = createStackNavigator (
  {
    Home:{
      screen:TabNavigator,
      navigationOptions:{
        header:null
      }
    },
    EventPage: Event,
    LocationPage: Location,
    AuthPage: Auth,
    AdminPage: Admin,
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

  componentDidMount(){
    if(firebase.auth().currentUser==null){
      firebase.auth().signInAnonymouslyAndRetrieveData()
        .then((data) => {
          console.log("signed in anonymously: ")
        });
    }else {
      console.log("Already loged as: ")
      console.log(firebase.auth().currentUser.email);
    }

        //resetDatabase()
  }

  render() {
    return <RootNavigator />;
  }

}

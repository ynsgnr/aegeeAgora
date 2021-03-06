
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, ActivityIndicator} from 'react-native';

import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import { BottomTabBar } from 'react-navigation-tabs'

import firebase from 'react-native-firebase';

import Icon from 'react-native-vector-icons/FontAwesome5';

import LogOutButton from './components/logOutButton'

import ScannerButton from './components/scannerButton'

//Tab Scenes
import Schedule from './scenes/Schedule';
import Map from './scenes/Map';
import Info from './scenes/Info';
import News from './scenes/News';

//Standalone scenes
import Location from './scenes/Location';
import Event from './scenes/Event'
import Auth from './scenes/Auth'
import EditEvent from './scenes/EditEvent'
import EditLocation from './scenes/EditLocation'
import EditNews from './scenes/EditNews'
import Scanner from './scenes/Scanner'

import styles from './resources/styles'

//import {resetDatabase} from './actions/write' //Used for injecting mock data to db

const SCREEN_WIDTH = Dimensions.get('window').width;

//Tab Navigator:
const TabNavigator = createBottomTabNavigator(
  {
    Schedule: {
      screen: Schedule,
      navigationOptions:{
        tabBarIcon:({ tintColor }) => (
            <Icon name="calendar" size={20} color={tintColor} solid/>
          ),
        tabBarOptions: {
          showIcon: true
        },
      }
    },
    Map:{
      screen:Map,
      navigationOptions:{
        tabBarIcon:({ tintColor }) => (
            <Icon name="map-marked" size={20} color={tintColor} solid/>
          ),
        tabBarOptions: {
          showIcon: true
        },
      }
    },
    Info:{
      screen:Info,
      navigationOptions:{
        tabBarIcon:({ tintColor }) => (
            <Icon name="info-circle" size={20} color={tintColor} solid/>
          ),
        tabBarOptions: {
          showIcon: true
        },
      }
    },
    News:{
      screen:News,
      navigationOptions:{
        tabBarIcon:({ tintColor }) => (
            <Icon name="newspaper" size={20} color={tintColor} solid/>
          ),
        tabBarOptions: {
          showIcon: true
        },
      }
    },
  },
  {
    initialRouteName : 'Schedule', //Starting screen
    tabBarComponent: (props) =>
    <View>
    {(firebase.auth().currentUser!=null && firebase.auth().currentUser.isAnonymous==false) ?
    <View style={{flexDirection:'row'}}>
      <ScannerButton  style={{width:'15%'}}/>
      <BottomTabBar style={{width:'70%'}} {...props}/>
      <LogOutButton style={{width:'15%'}}/>
    </View>
    :
    <BottomTabBar {...props}/>
    }
    </View>
  },
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
    EditEventPage: EditEvent,
    EditLocationPage: EditLocation,
    EditNewsPage: EditNews,
    ScannerPage: Scanner,
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

  constructor(props){
    super(props)
    firebase.auth().signInAnonymouslyAndRetrieveData()
        .then((data) => {
          this.setState({logedIn:true})
        });
    this.state={
      logedIn:false
    }
  }


  setUpNotifications(){
    const channel = new firebase.notifications.Android.Channel('AEGEEagora-channel', 'AEGEE Agora Informative Notifications', firebase.notifications.Android.Importance.Max)
      .setDescription('Notifications related to AEGEE Agora');
    firebase.notifications().android.createChannel(channel);
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((n: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.

    });
    this.notificationListener = firebase.notifications().onNotification((n: Notification) => {
        // Process your notification as required

        //TODO Platform specific stuff

        n.setNotificationId('notificationId')
          .android.setChannelId('AEGEEagora-channel')
          .android.setAutoCancel(true)
          .android.setPriority(firebase.notifications.Android.Priority.High)

        firebase.notifications().displayNotification(n)
    });
    firebase.messaging().subscribeToTopic("all");
  }

  componentDidMount(){
    firebase.notifications().getInitialNotification()
          .then((notificationOpen: NotificationOpen) => {
            if (notificationOpen) {
              // App was opened by a notification
              // Get the action triggered by the notification being opened
              const action = notificationOpen.action;
              // Get information about the notification that was opened
              const notification: Notification = notificationOpen.notification;
              this.RootNavigator.dispatch(
                NavigationActions.reset({
                  index: 0,
                  // TabNav is a TabNavigator nested in a StackNavigator
                  actions: [NavigationActions.navigate({ routeName: 'News' })]
                })
              )
            }
          });

    firebase.messaging().hasPermission()
    .then(enabled => {
      if (enabled) {
        console.log("Yay we have permission!");
        this.setUpNotifications()
      } else {
        firebase.messaging().requestPermission()
        .then(() => {
          console.log("Yay we have persmission!");
          this.setUpNotifications()
        })
        .catch(error => {
          console.log("notification permission issue");
          console.log(error);
        });
      }
    });

    //resetDatabase()
  }

  componentWillUnmount() {
      if(this.notificationDisplayedListener)this.notificationDisplayedListener();
      if(this.notificationListener)this.notificationListener();
      if(this.notificationOpenedListener)this.notificationOpenedListener();
  }

  render() {
    if(this.state.logedIn)
      return <RootNavigator ref={navigatorRef=>this.RootNavigator=navigatorRef}/>
    else
      return <View style={styles.centered}><ActivityIndicator size="large"/></View>
  }

}

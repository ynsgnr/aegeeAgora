
import React, {Component} from 'react';
import { Text, View, ActivityIndicator} from 'react-native';

import NavBar from '../components/navBar'
import NewsList from '../components/newsList'

import firebase from 'react-native-firebase';

import {getAllNews} from '../actions/info'

const title = "Update Data"

export default class Admin extends Component {

  constructor(props){
    super(props)
    this.state={
      loading: true,
      user:{isAnonymous:true},
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: title
    }
  }

  componentDidMount(){
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      if(user==undefined || user.isAnonymous) this.props.navigation.replace('AuthPage')
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    if(this.state.loading || this.state.user.isAnonymous) return <ActivityIndicator size="large"/>
    return (
      <View>
        <Text>Loged In!</Text>
      </View>
    )
  }

}

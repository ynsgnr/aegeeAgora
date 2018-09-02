
import React, {Component} from 'react';
import { Text, View, ActivityIndicator} from 'react-native';

import NavBar from '../components/navBar'
import NewsList from '../components/newsList'

import firebase from 'react-native-firebase';


export default class Auth extends Component {

  constructor(props){
    super(props)
    this.state={
      isLoggedIn : false,
      loading: true,
      user:{},
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title:  navigation.getParam('title', 'Authenticating')
    };
  };

  componentDidMount(){
    let user = firebase.auth().currentUser
    if(user && user.isAnonymous!=false)this.props.navigation.replace('AdminPage')
    //Already logedin as anon check if mail
  }

  render() {
    if(this.state.isLoggedIn || this.state.loading) return <ActivityIndicator size="large"/>
    return (
      <View>
        <Text>Test Auth</Text>
      </View>
    )
  }

}

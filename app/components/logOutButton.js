
import React, {Component} from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity,Dimensions} from 'react-native';

import { withNavigation } from 'react-navigation';

import NewsList from '../components/newsList'

import colors from '../resources/colors'

import firebase from 'react-native-firebase';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class LogOutButton extends Component {

  constructor(props){
    super(props)
    this.state={
      user:{isAnonymous:true},
    }
  }

  componentDidMount(){
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      if(user==undefined || user.isAnonymous) this.props.navigation.replace('Home')
    });
    let user = firebase.auth().currentUser
    if(user!=null && user.isAnonymous==false){
      this.setState({
        user:user,
      })
    }
  }

  componentWillUnmount() {
    if (this.unsubscriber) this.unsubscriber()
  }

  render() {
    return (
      <View style={{flex:1,flexDirection:'row'}}>
        <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.ligthRed}} onPress={()=>{firebase.auth().signOut()}}>
          <Text style={[styles.subText,{color:colors.white}]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

export default withNavigation(LogOutButton)

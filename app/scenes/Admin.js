
import React, {Component} from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';

import NewsList from '../components/newsList'

import colors from '../resources/colors'

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
    let user = firebase.auth().currentUser
    if(user!=null && user.isAnonymous==false){
      this.setState({
        user:user,
        loading:false,
      })
    }
  }

  componentWillUnmount() {
    if (this.unsubscriber) this.unsubscriber()
  }

  render() {
    if(this.state.loading || this.state.user.isAnonymous) return <View style={styles.centered}><ActivityIndicator size="large"/></View>
    return (
      <View style={styles.centered}>
        <Text>Loged In!</Text>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={[styles.bigButton,{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.ligthRed}]} onPress={()=>{firebase.auth().signOut()}}>
            <Text style={[styles.subText,{color:colors.white}]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

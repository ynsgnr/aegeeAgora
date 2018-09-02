
import React, {Component} from 'react';
import { Text, View, ActivityIndicator, TextInput, TouchableOpacity} from 'react-native';

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
      email:'',
      pass:'',
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title:  navigation.getParam('title', 'Authenticating')
    };
  };

  componentDidMount(){
    let user = firebase.auth().currentUser
    if(user && user.isAnonymous==false)this.props.navigation.replace('AdminPage')
    else this.setState({loading:false})
  }

  render() {
    if(this.state.isLoggedIn || this.state.loading) return <ActivityIndicator size="large"/>
    return (
      <View style={styles.centered}>
        <TextInput onChangeText={(text)=>this.setState({email:text})} placeholder={'E-mail'} style={{width:150}}/>
        <TextInput secureTextEntry onChangeText={(text)=>this.setState({pass:text})} placeholder={'Password'} style={{width:150}}/>
        <TouchableOpacity style={styles.bigButton}><Text style={styles.subText}>Log in as Admin</Text></TouchableOpacity>
      </View>
    )
  }

}

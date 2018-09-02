
import React, {Component} from 'react';
import { Text, View, ActivityIndicator, TextInput, TouchableOpacity} from 'react-native';

import NavBar from '../components/navBar'
import NewsList from '../components/newsList'

import firebase from 'react-native-firebase';

import colors from '../resources/colors'

export default class Auth extends Component {

  constructor(props){
    super(props)
    this.state={
      isLoggedIn : false,
      loading: true,
      user:{},
      email:'email',
      pass:'pass',
      error:false,
      loggingIn:false,
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

  loginWithMail(){
    this.setState({loggingIn:true})
    console.log("Logging in with mail: "+this.state.email);
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.pass).then((data)=>{
      this.props.navigation.replace('AdminPage')
    },
    (error)=>{
      console.log(error);
      this.setState({error:true,loggingIn:false})
    })
  }

  render() {
    if(this.state.isLoggedIn || this.state.loading) return <ActivityIndicator size="large"/>
    return (
      <View style={styles.centered}>
        <TextInput onChangeText={(text)=>this.setState({email:text})} placeholder={'E-mail'} style={{width:150}}/>
        <TextInput secureTextEntry onChangeText={(text)=>this.setState({pass:text})} placeholder={'Password'} style={{width:150}}/>
        {this.state.loggingIn ?
          <ActivityIndicator style={{margin:15}}/>
          : <TouchableOpacity style={styles.bigButton} onPress={()=>this.loginWithMail()}><Text style={styles.subText}>Log in as Admin</Text></TouchableOpacity>
        }
        {this.state.error ?
          <Text style={[styles.subText,{color:colors.red}]}>Email or Password is Wrong</Text>
        : <Text style={styles.subText}>Log In as admin if you want to edit event data</Text>}
      </View>
    )
  }

}

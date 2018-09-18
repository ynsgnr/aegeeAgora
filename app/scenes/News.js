
import React, {Component} from 'react';
import { Text, View, ActivityIndicator} from 'react-native';

import NavBar from '../components/navBar'
import NewsList from '../components/newsList'

import { NavigationEvents } from 'react-navigation';

import firebase from 'react-native-firebase';

import {getAllNews} from '../actions/info'

const title = "News"

export default class News extends Component {

  constructor(props){
    super(props)
    this.state={
      newsList : {},
      loading: true,
    }
  }

  componentDidMount(){
    getAllNews().then( (val) =>{
      let newsList=[]
      this.setState({
        newsList:val,
        loading:false,
      })
    })
  }

  render() {
    return (
      <View>
        <NavigationEvents onWillFocus={payload => this.componentDidMount()} />
        <NavBar title={title} navigation={this.props.navigation} rigthButton={firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous} onRigthButtonPress={()=>this.props.navigation.push('EditNewsPage')}/>
        {this.state.loading ? <View style={styles.centered}><ActivityIndicator size="large"/></View> :
          <NewsList  navigation={this.props.navigation} news={this.state.newsList}  editMode={firebase.auth().currentUser.toJSON().email} onEdit={(item)=>this.props.navigation.push('EditNewsPage',{info:item})}/>
        }
      </View>
    );
  }

}

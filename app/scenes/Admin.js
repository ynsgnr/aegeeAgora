
import React, {Component} from 'react';
import { Text, View, ActivityIndicator} from 'react-native';

import NavBar from '../components/navBar'
import NewsList from '../components/newsList'

import {getAllNews} from '../actions/info'

const title = "Update Data"

export default class Admin extends Component {

  constructor(props){
    super(props)
    this.state={
      loading: true,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: title
    }
  }


  componentDidMount(){

  }

  render() {
    return (
      <View>
        {this.state.loading ? <ActivityIndicator size="large"/> :
          <View/>
        }
      </View>
    )
  }

}

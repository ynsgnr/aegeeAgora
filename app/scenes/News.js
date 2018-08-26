
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import NavBar from '../components/navBar'
import NewsList from '../components/newsList'

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
        <NavBar title={title}/>
        {this.state.loading ? <ActivityIndicator size="large"/> :
          <NewsList news={this.state.newsList}/>
        }
      </View>
    );
  }
}

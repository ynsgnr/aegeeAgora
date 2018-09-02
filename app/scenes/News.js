
import React, {Component} from 'react';
import { Text, View, ActivityIndicator} from 'react-native';

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
        <NavBar title={title} navigation={this.props.navigation}/>
        {this.state.loading ? <View style={styles.centered}><ActivityIndicator size="large"/></View> :
          <NewsList  navigation={this.props.navigation} news={this.state.newsList}/>
        }
      </View>
    );
  }

}

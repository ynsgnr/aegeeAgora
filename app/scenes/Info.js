
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import NavBar from '../components/navBar'
import InfoList from '../components/infoList'

import {getAllInfo} from '../actions/info'

const title = "Information & Contact"


//const types = ['contact','download','bonus','news'] //Info Types

const types = ['contact','download','bonus'] //Info Types
const titles = {
  contact:'Contacts',
  download:'Downloads',
  bonus:'Bonus Info',
  news:'News',
}

export default class Info extends Component {

  constructor(props){
    super(props)
    this.state={
      infoList : {},
      loading: true,
    }
  }

  componentDidMount(){
    getAllInfo().then( (val) =>{
      let infoList={}
      for(i=0;i<val.length;i++){
        if(infoList[val[i].type]==undefined)infoList[val[i].type]=[]
        infoList[val[i].type].push(val[i])
      }
      let sections = []
      for(i=0;i<types.length;i++){
          if(infoList[types[i]]!=undefined){
            sections.push({
              type:types[i],
              title:titles[types[i]],
              data:infoList[types[i]]
            })
          }
      }
      this.setState({
        infoList:sections,
        loading:false,
      })
    })
  }

  render() {
    return (
      <View>
        <NavBar title={title}/>
        {this.state.loading ? <ActivityIndicator size="large"/> :
          <InfoList infoList={this.state.infoList}/>
        }
      </View>
    );
  }
}

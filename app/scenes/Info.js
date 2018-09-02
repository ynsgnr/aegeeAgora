
import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';

import NavBar from '../components/navBar'
import InfoList from '../components/infoList'

import {getAllInfo,getTypes} from '../actions/info'

const title = "Information & Contact"


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
      getTypes().then( (typesAndTitles)=>{
        let infoList={}
        for(i=0;i<val.length;i++){
          if(infoList[val[i].type]==undefined)infoList[val[i].type]=[]
          infoList[val[i].type].push(val[i])
        }
        let sections = []
        for(i=0;i<(typesAndTitles.types.length);i++){
          if(infoList[typesAndTitles.types[i]]!=undefined){
              sections.push({
                type:typesAndTitles.types[i],
                title:typesAndTitles.titles[typesAndTitles.types[i]],
                data:infoList[typesAndTitles.types[i]]
              })
            }
        }
        this.setState({
          infoList:sections,
          loading:false,
        })
      })
    })
  }

  render() {
    return (
      <View>
        <NavBar title={title} navigation={this.props.navigation}/>
        {this.state.loading ? <ActivityIndicator size="large"/> :
          <InfoList navigation={this.props.navigation} infoList={this.state.infoList}/>
        }
      </View>
    );
  }

}

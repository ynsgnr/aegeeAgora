
import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';

import { NavigationEvents } from 'react-navigation';

import NavBar from '../components/navBar'
import InfoList from '../components/infoList'

import firebase from 'react-native-firebase';

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
        <NavigationEvents onWillFocus={payload => this.componentDidMount()} />
        <NavBar title={title} navigation={this.props.navigation} rigthButton={firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous} onRigthButtonPress={()=>this.props.navigation.push('EditNewsPage')}/>
        {this.state.loading ? <View style={styles.centered}><ActivityIndicator size="large"/></View> :
          <InfoList navigation={this.props.navigation} infoList={this.state.infoList} editMode={!firebase.auth().currentUser.toJSON().isAnonymous} onEdit={(item)=>this.props.navigation.push('EditNewsPage',{info:item})}/>
        }
      </View>
    );
  }

}

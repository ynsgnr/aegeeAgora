
import React, {Component} from 'react';
import { View, ActivityIndicator,Linking} from 'react-native';

import NavBar from '../components/navBar'
import NewsList from '../components/newsList'

import { NavigationEvents } from 'react-navigation';

import firebase from 'react-native-firebase';

import {getAllNews,getEasterEgg} from '../actions/info'

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
      val.sort(function(a, b){
        try {
          keya=parseInt(a.key)
          keyb=parseInt(b.key)
        }catch(error){
          keya=a.key
          keyb=b.key
        }
        if(keya > keyb) return -1;
        if(keya < keyb) return 1;
        return 0;
      })
      this.setState({
        newsList:val,
        loading:false,
      })
    })    
    getEasterEgg().then((data)=>{
      this.setState({easterImage:data.image})
    })
  }

  //Easter egg values
  easterEggIndex=0
  easterEggOrder=['u','u','d','d','l','r','l','r']
  startEvent = null  
  SLIDEROFFSETUD = 8 
  SLIDEROFFSETLR = 40

  displayEasterEgg(){
    console.log("Easter egg activated")
    Linking.openURL(this.state.easterImage)
  }

  render() {
    return (
      <View style={{flex:1}} onStartShouldSetResponder={event=>{this.startEvent=event.nativeEvent;return true}}
      onResponderRelease={event=>{
        if(this.easterEggIndex>=this.easterEggOrder.length){this.displayEasterEgg();this.easterEggIndex=0;}
        else if(this.startEvent.locationX-event.nativeEvent.locationX>=this.SLIDEROFFSETLR
          && Math.abs(event.nativeEvent.locationY-this.startEvent.locationY)<this.SLIDEROFFSETUD*3
          && this.easterEggOrder[this.easterEggIndex]=='l')this.easterEggIndex++
        else if(event.nativeEvent.locationX-this.startEvent.locationX>=this.SLIDEROFFSETLR
          && Math.abs(event.nativeEvent.locationY-this.startEvent.locationY)<this.SLIDEROFFSETUD*3
          && this.easterEggOrder[this.easterEggIndex]=='r')this.easterEggIndex++
        else if(event.nativeEvent.locationY-this.startEvent.locationY>=this.SLIDEROFFSETUD
          && Math.abs(event.nativeEvent.locationX-this.startEvent.locationX)<this.SLIDEROFFSETLR
          && this.easterEggOrder[this.easterEggIndex]=='d')this.easterEggIndex++
        else if(this.startEvent.locationY-event.nativeEvent.locationY>=this.SLIDEROFFSETUD
          && Math.abs(event.nativeEvent.locationX-this.startEvent.locationX)<this.SLIDEROFFSETLR
          && this.easterEggOrder[this.easterEggIndex]=='u')this.easterEggIndex++
        else this.easterEggIndex=0
      }}
      >
        <NavigationEvents onWillFocus={payload => this.componentDidMount()} />
        <NavBar title={title} navigation={this.props.navigation} rigthButton={firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous} onRigthButtonPress={()=>this.props.navigation.push('EditNewsPage')}/>
        {this.state.loading ? <View style={styles.centered}><ActivityIndicator size="large"/></View> :
          <NewsList  navigation={this.props.navigation} news={this.state.newsList}  editMode={firebase.auth().currentUser.toJSON().email} onEdit={(item)=>this.props.navigation.push('EditNewsPage',{info:item})}/>
        }
      </View>
    );
  }

}

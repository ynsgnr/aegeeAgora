import React, { Component } from 'react';
import {Text, View, TouchableWithoutFeedback } from 'react-native';

import styles from '../resources/styles'
import colors from '../resources/colors'

export default class NavBar extends Component {

  constructor(props){
    super(props)
    this.state={
      clickCount:0
    }
  }

  openAdminPage(){
    console.log("Pressed on navbar");
    if(this.state.clickCount>=5 && this.props.navigation!=undefined){
      this.props.navigation.push('AuthPage')
      this.setState({clickCount:0})
    }else{
      this.setState((previousState)=>{
        return {clickCount:previousState.clickCount+1}
      })
    }
  }

  render(){
    return(
      <View style={styles.navbar}>
        <TouchableWithoutFeedback onPress={()=>this.openAdminPage()}>
            <Text style={[{fontSize:20, color:'black', padding:10}]}>{this.props.title ? this.props.title : ""}</Text>
        </TouchableWithoutFeedback>
      </View>
    )
  }

}

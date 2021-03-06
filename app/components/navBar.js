import React, { Component } from 'react';
import {Text, View, TouchableWithoutFeedback, TouchableOpacity, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from '../resources/styles'
import colors from '../resources/colors'

export default class NavBar extends Component {

  static defaultProps = {
    onRigthButtonPress:()=>{console.log("Pressed on rigth button on navbar")},
    rigthButton:false,
  }

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

  getPlatformSpecificStyle(){
    return  Platform.select({
        ios: [styles.navbar,{marginTop:25}] ,
        android: [styles.navbar,{marginTop:0}]
      })
  }

  render(){
    return(
      <View style={this.getPlatformSpecificStyle()}>
        <TouchableWithoutFeedback style={{flex:1}} onPress={()=>this.openAdminPage()}>
          <View>
            <Text style={[{fontSize:20, color:'black', padding:10}]}>{this.props.title ? this.props.title : ""}</Text>
          </View>
        </TouchableWithoutFeedback>
        {this.props.rigthButton &&
          <TouchableOpacity style={{padding:5,position:'absolute',right:0}} onPress={this.props.onRigthButtonPress}>
            <Icon name="plus-circle" size={25} color={colors.ligthBlue} solid/>
          </TouchableOpacity>
        }
      </View>
    )
  }

}

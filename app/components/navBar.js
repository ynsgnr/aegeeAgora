import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
} from 'react-native';

import styles from '../resources/styles'
import colors from '../resources/colors'


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class NavBar extends Component {

  render(){
    return(
      <View>
        <View style={[{width:SCREEN_WIDTH, justifyContent: 'space-around', alignItems:'stretch', flexDirection:'row',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0, 0, 0, 0.12)'}]}>
            <Text style={[{fontSize:20, color:'black', padding:10}]}>{this.props.title ? this.props.title : ""}</Text>
        </View>
      </View>
    )
  }
};


export default (NavBar)

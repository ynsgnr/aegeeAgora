import React, { Component } from 'react';
import {Text, View } from 'react-native';

import styles from '../resources/styles'
import colors from '../resources/colors'

export default class NavBar extends Component {
  
  render(){
    return(
        <View style={styles.navbar}>
            <Text style={[{fontSize:20, color:'black', padding:10}]}>{this.props.title ? this.props.title : ""}</Text>
        </View>
    )
  }

}

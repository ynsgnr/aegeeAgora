
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import NavBar from '../components/navBar'

const title = "Map"

export default class Map extends Component {

  render() {
    return (
      <View>
        <NavBar title={title}/>
        <Text >{title}</Text>
      </View>
    );
  }
}
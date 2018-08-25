
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import NavBar from '../components/navBar'

const title = "Event"

export default class Event extends Component {

  render() {
    return (
      <View>
        <NavBar title={title}/>
        <Text >{title}</Text>
      </View>
    );
  }
}

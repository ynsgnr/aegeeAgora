
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import styles from '../resources/styles'

import NavBar from '../components/navBar'

const title = "Schedule"

export default class Schedule extends Component {

  render() {
    return (
      <View>
        <NavBar title={title}/>
        <Text >{title}</Text>
      </View>
    );
  }
}

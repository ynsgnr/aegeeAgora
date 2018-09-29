
import React, {Component} from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity,Dimensions} from 'react-native';

import { withNavigation } from 'react-navigation';

import NewsList from '../components/newsList'

import colors from '../resources/colors'

import firebase from 'react-native-firebase';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class ScannerButton extends Component {

  render() {
    return (
      <View style={{flex:1,flexDirection:'row'}}>
        <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.ligthYellow}} onPress={()=>{this.props.navigation.push('ScannerPage')}}>
          <Text style={[styles.subText,{color:colors.white}]}>Scanner</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

export default withNavigation(ScannerButton)

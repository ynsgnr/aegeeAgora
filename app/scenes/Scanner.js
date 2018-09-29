
import React, {Component} from 'react';
import { Text, View, ActivityIndicator, Platform, StyleSheet} from 'react-native';

import style from '../resources/styles'

import NavBar from '../components/navBar'

import { NavigationEvents } from 'react-navigation';

import firebase from 'react-native-firebase';

import {getAllNews} from '../actions/info'

import { RNCamera } from 'react-native-camera';

const title = "News"

export default class Scanner extends Component {

  constructor(props){
    super(props)
    this.state={
      loading: true,
      infoText: "Scaning...",
    }
  }


  componentDidMount(){
    this.setState({
      loading:false,
    })
    this.lastRead=""
  }

  onTextRecognized(data){
    text=data.textBlocks
    for(i=0;i<text.length;i++){
      if(text[i].value.includes("226-") && text[i].value!=this.lastRead){
        console.log(text[i].value);

        this.lastRead=text[i].value
      }
    }
  }

  render() {
    return (
      <View style={style.}>

        <View style={styles.container}>
          <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style = {styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'We need your permission to use your camera phone'}
              onTextRecognized={(texts)=>this.onTextRecognized(texts)}
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

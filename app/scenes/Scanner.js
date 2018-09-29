
import React, {Component} from 'react';
import { Text, View, ActivityIndicator, Platform, StyleSheet} from 'react-native';

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
    }
  }

  componentDidMount(){
    this.setState({
      loading:false,
    })
  }

  onBarCodeRead(barcode){
    console.log(barcode);
  }

  render() {
    return (
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
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log("reading with google vision");
              this.onBarCodeRead(barcodes)
            }}
            onBarCodeRead={
              Platform.select({
                  ios: (barcodes)=>this.onBarCodeRead(barcodes) ,
                  android: undefined
                })
            }
        />
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

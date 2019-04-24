
import React, {Component} from 'react';
import { Text, View, ActivityIndicator, Platform, StyleSheet, TouchableOpacity} from 'react-native';

import styles from '../resources/styles'
import colors from '../resources/colors'

import NavBar from '../components/navBar'

import { NavigationEvents } from 'react-navigation';

import firebase from 'react-native-firebase';

import {getStart, doSomethingWithBarcode, loginToSystem, login} from '../actions/barcodes'

import { RNCamera } from 'react-native-camera';

const title = "News"

export default class Scanner extends Component {

  constructor(props){
    super(props)
    this.state={
      loading: true,
      infoText: "Scaning...",
      returnText: ""
    }
  }


  componentDidMount(){
    this.start="42424242424242424242"
    loginToSystem().then((response)=>{
      console.log(response);
    }).then(()=>{
      login("username","password").then(()=>{
        this.setState({
          loading:false,
        })
      })
    })
    getStart().then((start)=>this.start=start)
    this.lastRead=""
  }

  onTextRecognized(data){
    text=data.textBlocks
    for(i=0;i<text.length;i++){
      if(text[i].value.includes(this.start) && text[i].value!=this.lastRead){
        this.lastRead=text[i].value
        doSomethingWithBarcode(this.lastRead).then((responseText)=>{
          this.setState({infoText:'Last Scanned: '+this.lastRead})
          if(responseText){
            this.setState({returnText:responseText})
          }else{
            this.setState({returnText:"Server Error"})
          }
        })
      }
    }
  }

  onBarCodeRead(barcodes){
    for(i=0;i<barcodes.length;i++){
      if(barcodes[i].data && barcodes[i].data!=this.lastRead){
        this.lastRead=barcodes[i].data
        doSomethingWithBarcode(this.lastRead).then((responseText)=>{
          this.setState({infoText:'Last Scanned: '+this.lastRead})
          if(responseText){
            this.setState({returnText:responseText})
          }else{
            this.setState({returnText:"Server Error"})
          }
        })
      }
    }
  }

  render() {
    if(this.state.loading) return (<View style={styles.centered}><ActivityIndicator size="large"/></View>)
    return (
      <View style={style.container}>
        <View style={{backgroundColor:colors.white,padding:10,borderColor:colors.ligthGrey,borderWidth:1,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
          <View style={{padding:1,flexDirection:"column"}}>
            <Text style={styles.subText}>{this.state.infoText}</Text>
            <Text style={styles.subText}>{this.state.returnText}</Text>
          </View>
          <TouchableOpacity style={{padding:5,backgroundColor:colors.ligthGrey,borderRadius:5}} onPress={()=>{
            this.lastRead=""
            this.setState({infoText:"Scaning...",returnText:""})
          }}>
            <Text>Clean</Text>
          </TouchableOpacity>
        </View>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {style.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onTextRecognized={(texts)=>this.onTextRecognized(texts)}
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

const style = StyleSheet.create({
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

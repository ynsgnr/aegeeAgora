
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity ,Image, ScrollView, Picker, TextInput} from 'react-native';

import {getTypes, getInfoByKey, writeInfo} from '../actions/info'

//Resources
import styles from '../resources/styles'
import colors from '../resources/colors'

export default class NewsList extends Component {

  //Props avaliable by component props or navigation paramaters
  //component props overwrites Navigation paramaters
  //locationKey overwrites location obect
  static defaultProps = {
    newsKey:"",
    news: undefined,
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Loading...')
    };
  };

  constructor(props){
    super(props)
    this.state={
      news : {},
      newsKey : "",
      loading: true,
      typePickerList:[]
    }
  }

  componentDidMount(){
    let infoKey = ""
    let info = undefined

    //Get event or infoKey from props or navigation params, props overwrites navigation params
    if(this.props.infoKey=="") infoKey=this.props.navigation.getParam("infoKey", "")
    if(this.props.info==undefined){
      info=this.props.navigation.getParam("info", undefined )
    }else{info=this.props.info}

    //construct location picker
    getTypes().then((data)=>{
      let pickerValues = []
      for(i=0;i<data.types.length;i++){
        let name = data.titles[data.types[i]]
        let key = data.types[i]
        pickerValues.push(
          <Picker.Item label={name} value={key} key={i} />
        )
      }
      pickerValues.push(
        <Picker.Item label={"News"} value={"news"} key={-1} />
      )
      //if there is infoKey, get event from db, infoKey overwrites event object with event object from db
      if(infoKey!=""){
        getInfoByKey(infoKey).then( (val) =>{
          this.props.navigation.setParams({title: "Edit Information or News"})
          this.setState({
            info:val,
            loading:false,
            typePickerList:pickerValues,
          })
        })
      }else if(info!=undefined){
        this.props.navigation.setParams({title: "Edit Information or News"})
        this.setState({
          info:info,
          loading:false,
          typePickerList:pickerValues,
        })
      }else{
        console.log("No event or key found, add a new event")
        this.props.navigation.setParams({title: "Add New Info or News"})
        this.setState({
          info:{
            "eventKey" : "",
            "image" : "",
            "key" : "-1",
            "link" : "",
            "locationKey" : "",
            "text" : "",
            "title" : "",
            "type" : "news",
            "valid" : true
          },
          "typePickerList":pickerValues,
          loading:false,
        })
      }
    })
  }

  render(){
    console.log(this.state);
    return(
      <View>
        {this.state.loading ? <View style={styles.centered}><ActivityIndicator size="large"/></View> :
          <ScrollView>

            <Text style={[styles.titleText,styles.darkText]}>Title:</Text>
            <TextInput  placeholder={'Title'} style={[styles.subText,styles.darkText,{marginLeft:10}]}
            onChangeText={(text)=>this.setState((previousState)=>{previousState.info.title=text;return previousState})}
            value={this.state.info.title}/>

            <Text style={[styles.titleText,styles.darkText]}>Text:</Text>
            <TextInput  placeholder={'Explanation'} style={[styles.subText,styles.darkText,{marginLeft:10}]}
            onChangeText={(text)=>this.setState((previousState)=>{previousState.info.text=text;return previousState})}
            value={this.state.info.text}/>

            <Text style={[styles.titleText,styles.darkText]}>Type:</Text>
            <Picker
              selectedValue={this.state.info.type}
              style={{ flex:1 }}
              onValueChange={(itemValue, itemIndex) =>{
                  this.setState((previousState)=>{
                    previousState.info.type=itemValue
                    return previousState}
                  )}
                }
              >
              {this.state.typePickerList}
            </Picker>

            <Text style={[styles.titleText,styles.darkText]}>Link:</Text>
            <TextInput  placeholder={'Opened when clicked, phone number for contacts, link for bonus and download'} style={[styles.subText,styles.darkText,{marginLeft:10}]}
            onChangeText={(text)=>this.setState((previousState)=>{previousState.info.link=text;return previousState})}
            value={this.state.info.link}/>

            <Text style={[styles.titleText,styles.darkText]}>Icon:</Text>
            <TextInput  placeholder={'Upload image to somewhere and copy link here'} style={[styles.subText,styles.darkText,{marginLeft:10}]}
            onChangeText={(text)=>this.setState((previousState)=>{previousState.info.image=text;return previousState})}
            value={this.state.info.image}/>

            <TouchableOpacity onPress={()=>  {writeInfo(this.state.info);this.props.navigation.pop()}} style={styles.bigButton}>
              <Text style={styles.titleText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigation.pop()} style={styles.bigButton}>
              <Text style={styles.titleText}>Cancel</Text>
            </TouchableOpacity>

          </ScrollView>
        }
      </View>
    )
  }

}

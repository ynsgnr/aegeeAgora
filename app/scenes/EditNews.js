
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity ,Image} from 'react-native';

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
      title: navigation.getParam('newsTitle', 'Loading...')
    };
  };

  constructor(props){
    super(props)
    this.state={
      news : {},
      newsKey : "",
      loading: true,
      editMode: false,
    }
  }

  //Render Item. Item Structıre:
  /*
        info:{
          eventKey:
          locationKey:
          locationInfo:
          eventInfo:
          key:
          type:
          title:
          picture:
          text:
          link:
        }
  */

  renderNews(news){
    return(
      <View style={styles.listItem}>
          <View style={style.leftSmall}>
            <Image style={{width:50, height:50}} source={{uri:news.item.image}}/>
          </View>
          <View style={style.leftMid}>
            <View style={styles.line}/>
          </View>
          <View style={[style.rightBig,{flexDirection:'column',alignItems:'flex-start'}]}>
            <Text style={styles.titleText}>{news.item.title}</Text>
            <View style={styles.lineButtonWrapper}>
              {(news.item.eventKey!='') &&
                <TouchableOpacity style={styles.lineButtons} onPress={()=>console.log(news.item.eventKey)}>
                  <Text style={{padding:5}}>!</Text>
                  <Text style={styles.subText}> {news.item.eventInfo} </Text>
                </TouchableOpacity>
              }
              {(news.item.locationKey!='') &&
                <TouchableOpacity style={styles.lineButtons} onPress={()=>console.log(news.item.locationKey)}>
                  <Text style={{padding:5}}>!</Text>
                  <Text style={styles.subText}> {news.item.locationInfo} </Text>
                </TouchableOpacity>
              }
            </View>
            <Text style={styles.subText}>{news.item.text}</Text>
          </View>
      </View>
    )
  }


  render(){
    return(
      <FlatList style={[{marginBottom:50}]} data ={this.props.news} renderItem={(item)=>this.renderNews(item)}/>
    )
  }

}

const style = StyleSheet.create({
  leftSmall:{
    flexDirection:'column',
    flex:2,
    marginLeft:10,
  },
  rightBig:{
    flexDirection:'column',
    flex:10,
    alignItems:'flex-start',
    padding:3,
    marginBottom:5,
  },
  rightSmall:{
    flexDirection:'column',
    flex:5,
    alignItems:'flex-end',
    padding:3,
    marginBottom:5,
  },
  leftMid:{
    alignItems:'center',
    flex:1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  subText:{
    marginBottom:7,
    padding:1,
    fontSize:15,
  },
  titleText:{
    padding:1,
    marginTop:7,
    fontSize:18,
  },
})

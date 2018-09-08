
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity ,Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

//Resources
import styles from '../resources/styles'
import colors from '../resources/colors'

export default class NewsList extends Component {

  static defaultProps = {
    news:[],
    editMode:false,
    onEdit:(item)=>{console.log(item)}
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
                <TouchableOpacity style={styles.lineButtons} onPress={()=>this.props.navigation.navigate('EventPage', {eventKey:news.item.eventKey})}>
                  <Icon name="calendar" size={15} color={colors.ligthGrey} solid/>
                  <Text style={styles.subText}> {news.item.eventInfo} </Text>
                </TouchableOpacity>
              }
              {(news.item.locationKey!='') &&
                <TouchableOpacity style={styles.lineButtons} onPress={()=>this.props.navigation.navigate('LocationPage', {locationKey:news.item.locationKey})}>
                  <Icon name="map-marker-alt" size={15} color={colors.ligthGrey} solid/>
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
      <FlatList style={[{marginBottom:50}]} data={this.props.news} renderItem={(item)=>{
        if(this.props.editMode) {return(
          <TouchableOpacity onPress={()=>this.props.onEdit(item.item)}>
            {this.renderNews(item)}
          </TouchableOpacity>
        )}
        else return this.renderNews(item)}
      }/>
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

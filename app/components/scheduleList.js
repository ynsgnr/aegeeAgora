
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

//Resources
import styles from '../resources/styles'

export default class ScheduleList extends Component {

  static defaultProps = {
    events:{},
    editMode:false,
  }

  //Render Item. Item Structıre:
  /*
      event:{
        key:
        startDate:
        event:{
          key: - Passed as context
          location: //id - Passed as context
          locationInfo:'' - Displayed
          news:[] - Passed as context
          title: '' - Displayed
          startDate: date - Displayed
          endDate: date - Displayed
          description: '' - Passed as context
        }
      }
  */

  renderEventList(event){
    let eventList=this.props.events[event.item]
    let renderedList=[]

    for(i=0;i<eventList.length;i++){
      let event = eventList[i]
      renderedList.push(
        <TouchableOpacity key={i} onPress={()=>{
          if(this.props.editMode) this.props.navigation.navigate('EditEventPage', {event:event})
          else this.props.navigation.navigate('EventPage', {event:event})
        }}>
          <Text style={style.titleText}>{eventList[i].title}</Text>
          <View style={{flexDirection:'row',alignItems:'center',padding:5}}>
            <Icon name="map-marker-alt" size={15} color={colors.ligthGrey} solid/>
            <Text style={style.subText}>{eventList[i].locationInfo}</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return(
      <View style={styles.listItem}>
          <View style={style.leftSmall}>
            <Text style={styles.subText}>{event.item}</Text>
          </View>
          <View style={style.leftMid}>
            <View style={styles.line}/>
            { (eventList.length>1)
              ? <View style={[styles.littleCircle,{height:eventList.length*50}]}/>
              : <View style={styles.littleCircle}/>
            }
            <View style={styles.line}/>
          </View>
          <View style={[style.rightBig,{flexDirection:'column',alignItems:'flex-start'}]}>
            {renderedList}
          </View>
      </View>
    )
  }


  render(){
    return(
      <FlatList style={[{marginBottom:50}]} keyExtractor={(item,index)=>item} data={Object.keys(this.props.events).sort()} renderItem={(item)=>this.renderEventList(item)}/>
    )
  }

}

const style = StyleSheet.create({
  leftSmall:{
    flexDirection:'column',
    flex:2,
    padding:5,
    marginBottom:5,
  },
  rightBig:{
    flexDirection:'column',
    flex:10,
    alignItems:'flex-start',
    padding:5,
    marginBottom:5,
  },
  leftMid:{
    alignItems:'center',
    flex:1
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

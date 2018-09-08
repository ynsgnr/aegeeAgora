
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, SectionList, TouchableOpacity} from 'react-native';

//Resources
import styles from '../resources/styles'

export default class EventsList extends Component {

  static defaultProps = {
    events:undefined,
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

  constructor(props){
    super(props)
    this.state={
      sections:[]
    }
  }

  componentDidMount(){
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.events!=undefined) keys=Object.keys(nextProps.events)
    else keys=[]
    let sections=[]
    for(i=0;i<keys.length;i++){
      let data=[]
      let hourKeys=Object.keys(nextProps.events[keys[i]])
      for(j=0;j<hourKeys.length;j++){
        data.push({
          date:hourKeys[j],
          data:nextProps.events[keys[i]][hourKeys[j]],
        })
      }
      sections.push({title:keys[i],data:data})
    }
    this.setState({
      sections:sections
    })
  }

  renderEventList(event){
    let eventList=event.item.data
    let renderedList=[]

    for(i=0;i<eventList.length;i++){
      let event = eventList[i]
      renderedList.push(
        <TouchableOpacity key={i} onPress={()=>{
          if(this.props.editMode) this.props.navigation.navigate('EditEventPage', {event:event})
          else this.props.navigation.navigate('EventPage', {event:event})
        }}>
          <Text style={style.titleText}>{eventList[i].title}</Text>
          <Text style={style.subText}>{eventList[i].locationInfo}</Text>
        </TouchableOpacity>
      )
    }

    return(
      <View style={styles.listItem}>
          <View style={style.leftSmall}>
            <Text style={styles.subText}>{event.item.date}</Text>
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
    if(this.props.events==undefined) return <ActivityIndicator size="large"/>
    return(
      <SectionList style={[{marginBottom:50}]}
      sections={this.state.sections}
      renderItem={(item,index,section)=>this.renderEventList(item,section)}
      renderSectionHeader={({section: {title}}) => (
        <View style={styles.daySelector}>
          <Text style={styles.daySelectorText}>{title}</Text>
        </View>
      )}/>
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

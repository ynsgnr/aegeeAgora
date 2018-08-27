
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, SectionList, TouchableOpacity ,Image} from 'react-native';

//Resources
import styles from '../resources/styles'
import colors from '../resources/colors'

export default class InfoList extends Component {

  static defaultProps = {
    infoList:[],
  }


  //Render Item. Item Structıre:
  /*
        info:{
          [
              {type:'', data: [
                  {
                    eventKey:
                    eventInfo:
                    locationKey:
                    locationInfo:
                    eventInfo:
                    key:
                    type:
                    title:
                    picture:
                    text:
                    link:
                  },
                ]
              },
          ]

        }
  */

  renderContact(contact){
    return(
      <View style={styles.listItem}>
          <View style={[style.leftSmall,{flex:3}]}>
            <Image style={{width:70, height:70, borderRadius:70}} source={{uri:contact.item.image}}/>
          </View>
          <View style={style.leftMid}>
            <View style={styles.line}/>
          </View>
          <View style={[style.rightBig,{flexDirection:'column',alignItems:'flex-start'}]}>
            <Text style={styles.titleText}>{contact.item.title}</Text>
            <Text style={styles.subText}>{contact.item.text}</Text>
            <TouchableOpacity onPress={()=>console.log("Open native contact info")}>
            < Text style={styles.titleText}>{contact.item.link}</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }

  renderDownload(download){
      return(
        <View style={styles.listItem}>
          <TouchableOpacity style={styles.bigButton} onPress={()=>console.log("Open native browser "+download.item.link)}>
            <View style={[style.leftSmall,{flex:1,alignItems:'center',justifyContent:'center',paddingLeft:15}]}>
              <Image style={{width:30, height:30}} source={{uri:download.item.image}}/>
            </View>
            <View style={[style.rightBig,{flexDirection:'column',alignItems:'flex-start',marginLeft:15}]}>
              <Text style={{padding:1, fontSize:18}}>{download.item.title}</Text>
              <Text style={{padding:1, fontSize:15}}>{download.item.text}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
  }

  renderBonus(bonus){
    return(
      <TouchableOpacity style={styles.listItem} onPress={()=>console.log("Go to webpage natively if link is not empty: " + bonus.item.link)}>
          <View style={style.leftSmall}>
            <Image style={{width:50, height:50}} source={{uri:bonus.item.image}}/>
          </View>
          <View style={style.leftMid}>
            <View style={styles.line}/>
          </View>
          <View style={[style.rightBig,{flexDirection:'column',alignItems:'flex-start'}]}>
            <Text style={styles.titleText}>{bonus.item.title}</Text>
            <Text style={styles.subText}>{bonus.item.text}</Text>
          </View>
      </TouchableOpacity>
    )
  }

  renderNews(news){
    return <View/> //For news display newsList
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

  renderItem(item){
    switch(item.item.type){
      case 'contact':
        return this.renderContact(item)
      case 'download':
        return this.renderDownload(item)
      case 'bonus':
        return this.renderBonus(item)
      case 'news':
        return this.renderNews(item)
      default:
        console.log("Type mismatch at ")
        console.log(item)
        return <View/>
    }
  }

  render(){
    return(
      <SectionList
        style={[{marginBottom:50}]}
        sections ={this.props.infoList}
        renderItem={(item,index,section)=>this.renderItem(item)}
        renderSectionHeader={({section: {title}}) => (
          <Text style={{fontWeight: 'bold', padding:10, fontSize:25}}>{title}</Text>
        )}/>
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

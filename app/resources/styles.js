
import {StyleSheet, Dimensions } from 'react-native';

import colors from './colors'

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export default styles = StyleSheet.create({
  body:{
    backgroundColor: colors.background,
  },
  centered:{
    alignItems:'center',
    justifyContent: 'center',
    height:SCREEN_HEIGHT*0.8,
  },
  listItem:{
    flexDirection:'row',
    width:SCREEN_WIDTH,
    alignItems:'center',
    justifyContent: 'flex-start',
    flex:1,
  },
  subText:{
    padding:5,
    fontSize:15,
  },
  titleText:{
    padding:7,
    fontSize:18,
  },
  littleCircle: {
    width: 10,
    height: 10,
    borderRadius: 10/2,
    backgroundColor: colors.ligthBlue,
  },
  line:{
    width:1,
    flex:1,
    backgroundColor: colors.ligthGrey,
    borderColor:colors.ligthGrey,
  },
  navbar:{
    width:SCREEN_WIDTH,
    height:50,
    justifyContent: 'space-around',
    alignItems:'stretch',
    flexDirection:'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)'
  },
  daySelector:{
    width:SCREEN_WIDTH,
    justifyContent: 'space-around',
    alignItems:'center',
    flexDirection:'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
    backgroundColor: colors.backgroundDarker,
  },
  daySelectorText:{
    fontSize:15,
    padding:15,
  },
  leftArrow:{
    fontSize:20,
  },
  rightArrow:{
    fontSize:20,
  },
  lineButtonWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    flex:1,
    padding:2,
    marginRight:10,
  },
  lineButtons:{
    alignItems:'flex-start',
    justifyContent:'flex-start',
    flexDirection:'row',
    flex:1,
  },
  bigButton:{
    margin:15,
    flexDirection:'row',
    borderWidth:1,
    borderRadius:50,
    borderColor: colors.backgroundDarker,
    backgroundColor: colors.white,
  },
  longTextWrapper:{
    padding:10,
  },
  startOriented:{
    justifyContent:'flex-start',
    alignItems:'flex-start',
    width:SCREEN_WIDTH,
  },
  darkText:{
    color:colors.black,
  }
})


import {
  StyleSheet,
  Dimensions,
} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export default styles = StyleSheet.create({
  fab:{
  borderColor:'rgba(231,229,245,1)',
  margin:5,
  width:50,
  height:50,
  alignItems:'center',
  justifyContent:'center',
  backgroundColor: '#ffffff',
  borderWidth: 1,
  borderRadius:100,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  elevation:3,
},
})

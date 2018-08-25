/** @format */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';

//Ignore isMounted() function error from react-native-navigation (It's coming from inside react native no problem)
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent(appName, () => App);

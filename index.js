/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/components/app/Main';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
AppRegistry.registerComponent(appName, () => App);

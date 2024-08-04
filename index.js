/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/components/app/Main';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

AppRegistry.registerComponent(appName, () => App);

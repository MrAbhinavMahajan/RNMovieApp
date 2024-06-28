import {Platform, Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
export const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} =
  Dimensions.get('window');
export const isAndroid = Platform.OS === 'android';
export const hasNotch = DeviceInfo.hasNotch();
export const isAirplaneMode = DeviceInfo.isAirplaneMode();
import * as NavigationService from '../service/Navigation';
import {APP_STACKS_MAP} from '../constants/Navigation';
export const terminateSession = () => {
  NavigationService.navigate(APP_STACKS_MAP.AUTH_STACK);
};

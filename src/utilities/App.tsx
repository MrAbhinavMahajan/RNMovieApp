import {Platform, Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
export const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} =
  Dimensions.get('window');
export const isAndroid = Platform.OS === 'android';
export const hasNotch = DeviceInfo.hasNotch();
export const isAirplaneMode = DeviceInfo.isAirplaneMode();
import * as NavigationService from '../service/Navigation';
import {APP_STACKS_MAP, APP_TABS_MAP} from '../constants/Navigation';
import {QUERY_CLIENT} from '../constants/Main';
export const startUserSession = () => {
  NavigationService.navigateReplace(APP_TABS_MAP.MAIN_TAB);
};
export const terminateUserSession = () => {
  QUERY_CLIENT.clear();
  NavigationService.navigateReplace(APP_STACKS_MAP.AUTH_STACK);
};

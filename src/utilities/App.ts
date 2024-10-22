import {Platform, Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {IMAGE_BASEURL} from '../constants/Main';
export const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} =
  Dimensions.get('window');
export const isAndroid = Platform.OS === 'android';
export const hasNotch = DeviceInfo.hasNotch();
export const isAirplaneMode = DeviceInfo.isAirplaneMode();
export const getImageURL = (path: string) => IMAGE_BASEURL + path;

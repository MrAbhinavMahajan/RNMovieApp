import {Platform, Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {IMAGE_BASEURL} from '../constants/Main';
export const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} =
  Dimensions.get('window');
export const isAndroid = Platform.OS === 'android';
export const hasNotch = DeviceInfo.hasNotch();
export const isAirplaneMode = DeviceInfo.isAirplaneMode();
export const getImageURL = (path: string) => IMAGE_BASEURL + path;

export function generateQueryParams(params: any): string {
  const queryString = Object.keys(params)
    .map(key => {
      const value = params[key];
      if (Array.isArray(value)) {
        return value
          .map(val => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
          .join('&');
      } else if (typeof value === 'object' && value !== null) {
        return generateQueryParams(value);
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
    })
    .join('&');
  return '?' + queryString;
}

export function parseQueryParams(queryString: string): Record<string, any> {
  const params: Record<string, any> = {};
  const cleanedString = queryString.startsWith('?')
    ? queryString.slice(1)
    : queryString;

  cleanedString.split('&').forEach(param => {
    const [key, value] = param.split('=').map(decodeURIComponent);

    if (params[key]) {
      if (Array.isArray(params[key])) {
        params[key].push(value);
      } else {
        params[key] = [params[key], value];
      }
    } else {
      params[key] = value;
    }
  });

  return params;
}

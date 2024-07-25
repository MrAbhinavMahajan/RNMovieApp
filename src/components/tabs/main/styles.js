import {StyleSheet} from 'react-native';
import {vpx} from '@libraries/responsive-pixels';
import {STD_SCREEN_COLOR} from '~/src/constants/Styles';

export const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    position: 'absolute', // ! Enables the Screen to acquire full height
    zIndex: 1,
    paddingBottom: 0, // ! Safe padding removal
    height: vpx(72), // ! Setting for safety in smaller devices
    backgroundColor: STD_SCREEN_COLOR,
  },
});

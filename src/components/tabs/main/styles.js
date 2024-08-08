import {StyleSheet} from 'react-native';
import {vpx} from '@libraries/responsive-pixels';
import {COLORS} from '~/src/constants/Colors';

export const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    position: 'absolute', // ! Enables the Screen to acquire full height
    zIndex: 1,
    paddingBottom: 0, // ! Safe padding removal
    height: vpx(72), // ! Setting for safety in smaller devices
    backgroundColor: COLORS.transparent,
  },
  tabBarItemStyle: {
    backgroundColor: COLORS.fullWhite,
  },
});

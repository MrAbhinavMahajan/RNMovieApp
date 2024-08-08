import {Platform, StyleSheet} from 'react-native';
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
    ...Platform.select({
      ios: {
        shadowColor: COLORS.fullBlack,
        shadowOffset: {width: 1, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 0, // Shadow fix in Android
      },
    }),
  },
  tabBarItemStyle: {
    backgroundColor: COLORS.fullWhite,
  },
});

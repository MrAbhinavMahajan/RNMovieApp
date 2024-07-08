import {StyleSheet} from 'react-native';
import {hpx, vpx} from '@libraries/responsive-pixels';

export const styles = StyleSheet.create({
  tabBar: {
    borderRadius: vpx(24),
    borderTopWidth: 0,
    position: 'absolute', // ! Enables the Screen to acquire full height
    zIndex: 1,
    paddingBottom: 0, // ! Safe padding removal
    height: vpx(72), // ! Setting for safety in smaller devices
  },
  tabBarBlurEffect: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: hpx(20),
  },
});

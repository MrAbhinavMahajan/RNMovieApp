import {StyleSheet} from 'react-native';
import {hpx, vpx} from '../../../libraries/responsive-pixels';

export const styles = StyleSheet.create({
  tabBar: {
    borderRadius: vpx(24),
    bottom: vpx(20),
    left: hpx(20),
    right: hpx(20),
    position: 'absolute', // ! Enables the Screen to acquire full height
    zIndex: 1,
    paddingBottom: 0, // ! Safe padding removal
    height: vpx(72), // ! Setting for safety in smaller devices
  },
});

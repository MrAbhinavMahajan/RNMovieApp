import {StyleSheet} from 'react-native';
import {hpx, vpx} from '../../../libraries/responsive-pixels';

export const styles = StyleSheet.create({
  tabBar: {
    paddingVertical: vpx(16),
    borderRadius: vpx(24),
    // margin: vpx(20),
    bottom: vpx(20),
    left: hpx(20),
    right: hpx(20),
    position: 'absolute',
    zIndex: 1,
  },
});

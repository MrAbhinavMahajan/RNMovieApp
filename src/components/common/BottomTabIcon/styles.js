import {StyleSheet} from 'react-native';
import {hpx, vpx} from '../../../libraries/responsive-pixels';

export const styles = StyleSheet.create({
  tabIconView: {
    alignItems: 'center',
  },
  indicator: {
    height: vpx(5),
    width: hpx(14),
    borderRadius: 8,
    marginTop: vpx(2),
  },
});

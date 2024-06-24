import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/Colors';
import {hpx, vpx} from '../../../libraries/responsive-pixels';

export const styles = StyleSheet.create({
  movieCardView: {
    backgroundColor: COLORS.fullWhite,
    aspectRatio: 3 / 5,
    borderRadius: vpx(8),
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
  },
  shadowEffect: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    paddingVertical: vpx(3),
  },
});

import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants/Colors';
import {hpx, vpx} from '../../../../libraries/responsive-pixels';

export const styles = StyleSheet.create({
  movieCardView: {
    backgroundColor: COLORS.fullWhite,
    width: vpx(80),
    aspectRatio: 3 / 5,
    borderRadius: vpx(8),
    overflow: 'hidden',
  },
  imageStyles: {},
});

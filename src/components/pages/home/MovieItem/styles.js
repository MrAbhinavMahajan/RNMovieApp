import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants/Colors';
import {hpx, vpx} from '../../../../libraries/responsive-pixels';

export const styles = StyleSheet.create({
  movieCardView: {
    backgroundColor: COLORS.fullWhite,
    height: vpx(150),
    width: hpx(90),
    borderRadius: vpx(8),
    overflow: 'hidden',
  },
  imageStyles: {},
});

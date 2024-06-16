import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants/Colors';
import {vpx} from '../../../../libraries/responsive-pixels';

export const styles = StyleSheet.create({
  movieCardView: {
    backgroundColor: COLORS.fullWhite,
    height: vpx(300),
    flex: 1,
  },
  imageStyles: {
    borderRadius: vpx(8),
  },
});

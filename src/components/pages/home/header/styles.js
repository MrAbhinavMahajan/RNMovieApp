import {StyleSheet} from 'react-native';
import {STD_HORIZONTAL_SPACING} from '../../../../constants/Styles';
import {hpx, vpx} from '../../../../libraries/responsive-pixels';
import {COLORS} from '../../../../constants/Colors';

export const styles = StyleSheet.create({
  containerView: {
    backgroundColor: COLORS.oceanBlue,
    paddingBottom: vpx(8),
    borderRadius: vpx(8),
  },
  scrollableContentView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: hpx(8),
    flexGrow: 1,
  },
  moviePoster: {
    borderWidth: 0,
  },
});

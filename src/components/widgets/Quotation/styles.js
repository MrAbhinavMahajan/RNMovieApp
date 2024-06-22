import {StyleSheet} from 'react-native';
import {FONTS} from '../../../constants/Fonts';
import {COLORS} from '../../../constants/Colors';
import {fpx, vpx} from '../../../libraries/responsive-pixels';
import {
  STD_HORIZONTAL_SPACING,
  STD_VERTICAL_SPACING,
} from '../../../constants/Styles';

export const styles = StyleSheet.create({
  contentView: {
    paddingVertical: STD_VERTICAL_SPACING,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: vpx(8),
  },
  quotationTitleText: {
    fontFamily: FONTS.Bold,
    color: COLORS.quickSilver,
    fontSize: fpx(46),
  },
  quotationSubtitleText: {
    fontFamily: FONTS.Regular,
    color: COLORS.quickSilver,
    fontSize: fpx(16),
  },
});

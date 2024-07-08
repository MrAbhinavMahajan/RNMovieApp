import {StyleSheet} from 'react-native';
import {FONTS} from '@constants/Fonts';
import {fpx, vpx} from '@libraries/responsive-pixels';
import {COLORS} from '@constants/Colors';
import {STD_HORIZONTAL_SPACING, STD_VERTICAL_SPACING} from '@constants/Styles';

export const styles = StyleSheet.create({
  contentView: {
    backgroundColor: COLORS.fullWhite,
    borderRadius: vpx(8),
    paddingVertical: 2 * STD_VERTICAL_SPACING,
    alignItems: 'center',
  },
  titleText: {
    marginTop: vpx(12),
    fontFamily: FONTS.SemiBold,
    fontSize: fpx(22),
    color: COLORS.fullBlack,
    textAlign: 'center',
  },
  subtitleText: {
    marginTop: vpx(8),
    fontFamily: FONTS.Regular,
    fontSize: fpx(16),
    color: COLORS.oliveBlack,
    textAlign: 'center',
    paddingHorizontal: STD_HORIZONTAL_SPACING,
  },
});

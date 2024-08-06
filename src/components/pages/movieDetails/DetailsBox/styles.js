import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/Colors';
import {FONTS} from '@constants/Fonts';
import {STD_HORIZONTAL_SPACING, STD_VERTICAL_SPACING} from '@constants/Styles';
import {fpx, vpx} from '@libraries/responsive-pixels';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    paddingVertical: STD_VERTICAL_SPACING,
  },
  titleText: {
    fontSize: fpx(16),
    fontFamily: FONTS.SemiBold,
    textAlign: 'center',
    color: COLORS.fullBlack,
  },
  genreText: {
    fontSize: fpx(12),
    fontFamily: FONTS.Regular,
    color: COLORS.basic700,
    textAlign: 'center',
    marginTop: vpx(4),
  },
  overViewTextContainer: {
    marginTop: vpx(4),
  },
  overViewText: {
    fontSize: fpx(14),
    fontFamily: FONTS.Regular,
    color: COLORS.basic700,
  },
  overViewCTAText: {
    fontSize: fpx(12),
    color: COLORS.basic700,
    fontFamily: FONTS.SemiBold,
  },
  errorContainer: {
    backgroundColor: COLORS.antiFlashWhite,
    paddingVertical: vpx(24),
    marginHorizontal: STD_HORIZONTAL_SPACING,
    borderRadius: 8,
    marginTop: vpx(10),
  },
});

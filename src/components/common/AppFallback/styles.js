import {StyleSheet} from 'react-native';
import {COLORS} from '~/src/constants/Colors';
import {FONTS} from '~/src/constants/Fonts';
import {STD_HORIZONTAL_SPACING} from '~/src/constants/Styles';
import {fpx, vpx} from '~/src/libraries/responsive-pixels';

export const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.antiFlashWhite,
    paddingVertical: vpx(24),
    marginHorizontal: STD_HORIZONTAL_SPACING,
    borderRadius: 8,
    marginTop: vpx(10),
  },
  titleText: {
    marginTop: vpx(8),
    fontFamily: FONTS.SemiBold,
    fontSize: fpx(18),
    color: COLORS.fullBlack,
  },
  subtitleText: {
    marginTop: vpx(8),
    fontFamily: FONTS.Regular,
    fontSize: fpx(14),
    color: COLORS.oliveBlack,
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

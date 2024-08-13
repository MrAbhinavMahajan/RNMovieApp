import {StyleSheet} from 'react-native';
import {COLORS} from '~/src/constants/Colors';
import {FONTS} from '~/src/constants/Fonts';
import {fpx, vpx} from '~/src/libraries/responsive-pixels';

export const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.antiFlashWhite,
    borderRadius: 8,
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

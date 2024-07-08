import {StyleSheet} from 'react-native';
import {FONTS} from '@constants/Fonts';
import {fpx, vpx} from '@libraries/responsive-pixels';
import {COLORS} from '@constants/Colors';

export const styles = StyleSheet.create({
  contentView: {
    alignItems: 'center',
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
});

import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/Colors';
import {FONTS} from '@constants/Fonts';
import {fpx, vpx} from '@libraries/responsive-pixels';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPageText: {
    fontSize: fpx(12),
    fontFamily: FONTS.Bold,
    color: COLORS.fullWhite,
    textShadowColor: COLORS.fullBlack,
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: vpx(3),
  },
  totalPageText: {
    fontSize: fpx(12),
    fontFamily: FONTS.Regular,
    color: COLORS.fullWhite,
    textShadowColor: COLORS.fullBlack,
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: vpx(3),
  },
});

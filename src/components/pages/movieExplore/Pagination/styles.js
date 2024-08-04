import {StyleSheet} from 'react-native';
import {COLORS} from '~/src/constants/Colors';
import {FONTS} from '~/src/constants/Fonts';
import {fpx, vpx} from '~/src/libraries/responsive-pixels';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: vpx(24),
  },
  currentPageText: {
    fontSize: fpx(16),
    fontFamily: FONTS.Bold,
    color: COLORS.fullWhite,
    textShadowColor: COLORS.fullBlack,
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: vpx(3),
  },
  totalPageText: {
    fontSize: fpx(16),
    fontFamily: FONTS.Regular,
    color: COLORS.fullWhite,
    textShadowColor: COLORS.fullBlack,
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: vpx(3),
  },
});

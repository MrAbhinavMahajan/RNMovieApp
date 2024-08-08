import {StyleSheet} from 'react-native';
import {COLORS} from '~/src/constants/Colors';
import {FONTS} from '~/src/constants/Fonts';
import {fpx, vpx} from '~/src/libraries/responsive-pixels';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  tabBgSvg: {
    position: 'absolute',
    top: 0,
  },
  floatingCTAView: {
    top: -vpx(24),
    aspectRatio: 1,
    borderRadius: 1000,
    borderWidth: vpx(2),
    borderColor: COLORS.fullWhite,
  },
  floatingCTA: {
    backgroundColor: COLORS.antiFlashWhite,
    flex: 1,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    margin: vpx(2),
  },
  floatingCTAText: {
    fontFamily: FONTS.SemiBold,
    fontSize: fpx(14),
    lineHeight: fpx(24),
    textAlign: 'center',
    color: COLORS.fullBlack,
    textTransform: 'uppercase',
  },
});

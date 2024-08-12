import {StyleSheet} from 'react-native';
import {COLORS} from '~/src/constants/Colors';
import {FONTS} from '~/src/constants/Fonts';
import {fpx, vpx} from '~/src/libraries/responsive-pixels';

export const styles = StyleSheet.create({
  primaryCTA: {
    backgroundColor: COLORS.danger400,
    alignItems: 'center',
    paddingVertical: vpx(12),
    borderRadius: vpx(8),
  },
  secondaryCTA: {
    backgroundColor: COLORS.fullWhite,
    alignItems: 'center',
    paddingVertical: vpx(12),
    borderRadius: vpx(8),
    borderWidth: 1,
    borderColor: COLORS.danger400,
  },
  primaryCTAText: {
    color: COLORS.fullWhite,
    fontSize: fpx(16),
    fontFamily: FONTS.SemiBold,
  },
  secondaryCTAText: {
    color: COLORS.danger400,
    fontSize: fpx(16),
    fontFamily: FONTS.SemiBold,
  },
});

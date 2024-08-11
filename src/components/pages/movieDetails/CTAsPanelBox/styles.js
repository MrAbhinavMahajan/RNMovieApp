import {StyleSheet} from 'react-native';
import {fpx, hpx, vpx} from '@libraries/responsive-pixels';
import {SCREEN_WIDTH} from '@utilities/App';
import {
  STD_HORIZONTAL_SPACING,
  STD_VERTICAL_SPACING,
} from '~/src/constants/Styles';
import {COLORS} from '~/src/constants/Colors';
import {FONTS} from '~/src/constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.azureishWhite,
  },
  scrollableContainer: {
    gap: hpx(8),
    paddingLeft: hpx(8),
    paddingVertical: STD_VERTICAL_SPACING,
  },
  ctaText: {
    color: COLORS.oliveBlack,
    fontFamily: FONTS.SemiBold,
    fontSize: fpx(12),
    marginLeft: hpx(2),
  },
  ctaView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vpx(4),
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    borderWidth: 1,
    borderRadius: vpx(24),
    borderColor: COLORS.lightGray,
  },
});

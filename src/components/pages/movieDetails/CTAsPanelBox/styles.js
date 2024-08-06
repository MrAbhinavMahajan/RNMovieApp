import {StyleSheet} from 'react-native';
import {hpx, vpx} from '@libraries/responsive-pixels';
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
  },
  ctaText: {
    marginTop: vpx(4),
    color: COLORS.fullBlack,
    fontFamily: FONTS.Regular,
  },
  ctaView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: STD_VERTICAL_SPACING,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
  },
});

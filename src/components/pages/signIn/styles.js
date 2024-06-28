import {StyleSheet} from 'react-native';
import {fpx, vpx} from '../../../libraries/responsive-pixels';
import {
  STD_HORIZONTAL_SPACING,
  STD_SCREEN_COLOR,
  STYLES,
} from '../../../constants/Styles';
import {FONTS} from '../../../constants/Fonts';
import {COLORS} from '../../../constants/Colors';

export const styles = StyleSheet.create({
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
  },
  screenScrollableView: {
    gap: vpx(8),
    paddingBottom: vpx(200),
  },
  screenTitle: {
    fontFamily: FONTS.BebasNeueRegular,
    color: COLORS.fullBlack,
    fontSize: fpx(48),
    marginHorizontal: STD_HORIZONTAL_SPACING,
  },
  textInput: {
    borderWidth: 1,
    paddingVertical: vpx(12),
    fontSize: vpx(16),
    marginHorizontal: STD_HORIZONTAL_SPACING,
  },
  submitCTA: {
    borderWidth: 1,
    paddingVertical: vpx(12),
    fontSize: vpx(16),
    backgroundColor: 'dodgerblue',
    marginHorizontal: STD_HORIZONTAL_SPACING,
  },
  submitCTATitleText: {},
});

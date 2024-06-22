import {StyleSheet} from 'react-native';
import {FONTS} from '../../../constants/Fonts';
import {fpx, vpx} from '../../../libraries/responsive-pixels';
import {COLORS} from '../../../constants/Colors';

export const styles = StyleSheet.create({
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: vpx(30),
  },
  titleText: {
    fontFamily: FONTS.SemiBold,
    fontSize: fpx(18),
    color: COLORS.fullBlack,
  },
  rightCTA: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

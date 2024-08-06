import {StyleSheet} from 'react-native';
import {FONTS} from '@constants/Fonts';
import {fpx, hpx, vpx} from '@libraries/responsive-pixels';
import {COLORS} from '@constants/Colors';

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
  subtitleText: {
    fontFamily: FONTS.Regular,
    fontSize: fpx(12),
    color: COLORS.oliveBlack,
  },
  rightCTA: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftJSXView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftJSXImageView: {
    width: hpx(30),
    aspectRatio: 3 / 5,
    marginRight: hpx(5),
  },
  leftJSXImage: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: hpx(3),
  },
});

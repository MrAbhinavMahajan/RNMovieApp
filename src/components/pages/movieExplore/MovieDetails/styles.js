import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/Colors';
import {FONTS} from '@constants/Fonts';
import {fpx, hpx, vpx} from '@libraries/responsive-pixels';
import {STD_VERTICAL_SPACING} from '@constants/Styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: fpx(18),
    fontFamily: FONTS.SemiBold,
    marginTop: vpx(8),
    color: COLORS.fullWhite,
  },
  metaContainer: {
    flexDirection: 'row',
    columnGap: hpx(12),
    alignItems: 'center',
    marginTop: vpx(8),
  },
  metaText: {
    fontSize: fpx(12),
    fontFamily: FONTS.Regular,
    color: COLORS.lightGray08,
  },
  dot: {
    height: vpx(5),
    backgroundColor: COLORS.lightGray08,
    aspectRatio: 1,
    borderRadius: 1000,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overViewTextContainer: {
    marginTop: vpx(8),
  },
  overViewText: {
    fontSize: fpx(14),
    fontFamily: FONTS.Regular,
    color: COLORS.lightGray08,
  },
  overViewCTAText: {
    fontSize: fpx(12),
    color: COLORS.fullWhite,
    fontFamily: FONTS.SemiBold,
    marginTop: STD_VERTICAL_SPACING,
  },
});

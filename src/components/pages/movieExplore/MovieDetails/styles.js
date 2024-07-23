import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/Colors';
import {FONTS} from '@constants/Fonts';
import {STD_HORIZONTAL_SPACING, STD_VERTICAL_SPACING} from '@constants/Styles';
import {fpx, hpx, vpx} from '@libraries/responsive-pixels';
import {SCREEN_WIDTH} from '@utilities/App';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    paddingVertical: STD_VERTICAL_SPACING,
    flex: 1,
    width: SCREEN_WIDTH,
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
  infoContainer: {
    marginTop: vpx(8),
  },
  infoText: {
    fontSize: fpx(14),
    fontFamily: FONTS.Regular,
    color: COLORS.lightGray08,
  },
  infoCTAText: {
    fontSize: fpx(12),
    color: COLORS.fullWhite,
    fontFamily: FONTS.SemiBold,
    marginTop: STD_VERTICAL_SPACING,
    alignSelf: 'flex-end',
  },
});

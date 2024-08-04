import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/Colors';
import {FONTS} from '@constants/Fonts';
import {STD_VERTICAL_SPACING} from '@constants/Styles';
import {fpx, hpx, vpx} from '@libraries/responsive-pixels';

export const styles = StyleSheet.create({
  movieDetailsView: {
    position: 'absolute',
    zIndex: 1,
    bottom: STD_VERTICAL_SPACING,
    alignItems: 'center',
    alignSelf: 'center',
  },
  titleText: {
    color: COLORS.fullWhite,
    fontSize: fpx(24),
    fontFamily: FONTS.BebasNeueRegular,
    textShadowColor: COLORS.fullBlack,
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: vpx(3),
    textAlign: 'center',
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
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

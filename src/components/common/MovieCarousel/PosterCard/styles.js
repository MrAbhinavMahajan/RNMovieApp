import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/Colors';
import {FONTS} from '@constants/Fonts';
import {fpx, hpx, vpx} from '@libraries/responsive-pixels';
import {SCREEN_WIDTH} from '~/src/utilities/App';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.fullBlack,
  },
  poster: {},
  titleText: {
    fontSize: fpx(18),
    fontFamily: FONTS.SemiBold,
    color: COLORS.fullWhite,
  },
  overviewText: {
    fontSize: fpx(14),
    fontFamily: FONTS.Regular,
    color: COLORS.lightGray08,
    marginTop: vpx(4),
  },

  ratingContainer: {
    alignSelf: 'center',
    marginTop: vpx(4),
  },
  ratingText: {
    marginRight: hpx(6),
    fontSize: fpx(14),
    fontFamily: FONTS.Bold,
  },

  genreContainer: {
    alignSelf: 'center',
    marginTop: vpx(4),
    gap: hpx(8),
  },
  genreCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.fullWhite,
    borderRadius: hpx(4),
    paddingHorizontal: hpx(8),
    paddingVertical: vpx(2),
  },
  genreText: {
    fontSize: fpx(12),
    fontFamily: FONTS.Regular,
    color: COLORS.lightGray08,
  },
});

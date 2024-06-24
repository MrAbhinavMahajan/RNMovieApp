import {StyleSheet} from 'react-native';
import {
  STD_HORIZONTAL_SPACING,
  STD_VERTICAL_SPACING,
} from '../../../../constants/Styles';
import {fpx, hpx, vpx} from '../../../../libraries/responsive-pixels';
import {COLORS} from '../../../../constants/Colors';
import {FONTS} from '../../../../constants/Fonts';
import {SCREEN_WIDTH} from '../../../../utilities/AppUtils';

export const styles = StyleSheet.create({
  containerView: {
    backgroundColor: COLORS.oceanBlue,
    paddingTop: vpx(100),
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    paddingBottom: vpx(36),
  },
  scrollableContentView: {
    gap: hpx(8),
    flexGrow: 1,
  },
  moviePoster: {
    width: hpx(120),
    marginRight: STD_HORIZONTAL_SPACING,
  },
  movieTitleView: {
    flex: 1,
    marginTop: vpx(12),
  },
  movieTitleText: {
    fontFamily: FONTS.BebasNeueRegular,
    fontSize: fpx(46),
    color: COLORS.azureishWhite,
    textShadowColor: COLORS.fullBlack,
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: vpx(3),
  },
  movieTaglineText: {
    fontFamily: FONTS.Medium,
    fontSize: fpx(16),
    color: COLORS.fullWhite,
    marginTop: vpx(8),
    textShadowColor: COLORS.fullBlack,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: vpx(3),
  },
  movieDetailsView: {
    flexDirection: 'row',
    marginTop: vpx(12),
  },
  movieInfoView: {
    flex: 1,
    marginTop: vpx(12),
  },
  movieVotesAvgView: {
    borderRadius: vpx(4),
    backgroundColor: COLORS.fullWhite,
    position: 'absolute',
    zIndex: 1,
    left: hpx(8),
    bottom: vpx(12),
  },
  movieVotesAvgText: {
    fontFamily: FONTS.Medium,
    fontSize: fpx(16),
    color: COLORS.oliveBlack,
    paddingVertical: vpx(1),
    paddingHorizontal: vpx(4),
  },
  movieVotesText: {
    fontFamily: FONTS.SemiBold,
    fontSize: fpx(20),
    color: COLORS.antiFlashWhite,
    marginTop: STD_VERTICAL_SPACING,
    textShadowColor: COLORS.fullBlack,
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: vpx(3),
  },
  backdropImageView: {
    position: 'absolute',
    zIndex: -1,
    width: SCREEN_WIDTH,
  },
});

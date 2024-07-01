import {StyleSheet} from 'react-native';
import {
  STD_HORIZONTAL_SPACING,
  STD_VERTICAL_SPACING,
} from '../../../../constants/Styles';
import {fpx, hpx, vpx} from '../../../../libraries/responsive-pixels';
import {COLORS} from '../../../../constants/Colors';
import {FONTS} from '../../../../constants/Fonts';
import {SCREEN_WIDTH} from '../../../../utilities/App';

export const styles = StyleSheet.create({
  containerView: {
    backgroundColor: COLORS.oceanBlue,
    paddingTop: vpx(120),
    paddingBottom: vpx(36),
  },
  scrollableContentView: {
    gap: hpx(8),
    flexGrow: 1,
  },
  moviePosterCard: {
    width: hpx(120),
    aspectRatio: 3 / 5,
    marginRight: STD_HORIZONTAL_SPACING,
  },
  moviePoster: {
    width: '100%',
    borderRadius: vpx(8),
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  movieDetails: {
    flex: 1,
    backgroundColor: '#00000040',
    borderRadius: 8,
    paddingVertical: STD_VERTICAL_SPACING,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    alignSelf: 'flex-start',
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
    fontSize: fpx(20),
    color: COLORS.fullWhite,
    textShadowColor: COLORS.fullBlack,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: vpx(3),
  },
  movieDetailsSectionView: {
    marginTop: STD_VERTICAL_SPACING,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
  },
  movieDetailsContainer: {
    flexDirection: 'row',
    marginTop: STD_VERTICAL_SPACING,
  },
  movieDetailsFooterView: {
    marginTop: 2 * STD_VERTICAL_SPACING,
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
  backdropImageView: {
    position: 'absolute',
    zIndex: -1,
    width: SCREEN_WIDTH,
  },
  genresScrollView: {
    flexDirection: 'row',
    paddingHorizontal: STD_HORIZONTAL_SPACING,
  },
  genreItemView: {
    backgroundColor: COLORS.antiFlashWhite,
    borderRadius: hpx(24),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.oliveBlack,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    paddingVertical: vpx(8),
    marginRight: STD_HORIZONTAL_SPACING,
  },
  genresText: {
    fontFamily: FONTS.SemiBold,
    fontSize: fpx(16),
    color: COLORS.fullBlack,
  },
  movieDetailsCardFooter: {
    marginTop: STD_VERTICAL_SPACING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rateCtaView: (enabled = false) => ({
    backgroundColor: enabled ? COLORS.fullWhite : COLORS.oceanBlue,
    borderRadius: vpx(20),
    alignSelf: 'flex-start',
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    paddingVertical: vpx(5),
  }),
  rateCtaText: (enabled = false) => ({
    fontFamily: FONTS.SemiBold,
    fontSize: fpx(16),
    color: enabled ? COLORS.fullBlack : COLORS.azureishWhite,
  }),
  movieVotesText: {
    fontFamily: FONTS.Bold,
    fontSize: fpx(14),
    color: COLORS.primary400,
    textShadowColor: COLORS.fullBlack,
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: vpx(3),
    marginTop: vpx(8),
  },
  movieDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.azureishWhite,
    width: '100%',
    marginTop: 2 * STD_VERTICAL_SPACING,
    marginBottom: STD_VERTICAL_SPACING,
  },
});

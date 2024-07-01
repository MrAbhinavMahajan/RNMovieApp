import {StyleSheet} from 'react-native';
import {
  STD_HORIZONTAL_SPACING,
  STD_VERTICAL_SPACING,
} from '../../../constants/Styles';
import {fpx, hpx, vpx} from '../../../libraries/responsive-pixels';
import {COLORS} from '../../../constants/Colors';
import {FONTS} from '../../../constants/Fonts';
import {SCREEN_HEIGHT} from '../../../utilities/App';

export const styles = StyleSheet.create({
  containerView: {
    zIndex: 1,
    flex: 1,
    paddingTop: STD_VERTICAL_SPACING, // ! Fix For Scroll Insets Misalignment
  },
  scrollableContentView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    paddingBottom: vpx(200),
    flexGrow: 1,
  },
  moviePoster: {
    width: hpx(80),
    aspectRatio: 3 / 5,
    borderRadius: vpx(8),
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: COLORS.quickSilver,
    marginTop: vpx(16),
    marginBottom: vpx(8),
  },
  itemContainerView: {
    flexDirection: 'row',
  },
  itemInfoView: {
    flex: 1,
    paddingLeft: STD_HORIZONTAL_SPACING,
    paddingVertical: vpx(8),
  },
  itemTitleText: {
    fontFamily: FONTS.BebasNeueRegular,
    fontSize: fpx(24),
    color: COLORS.oceanBlue,
    paddingRight: 2 * STD_HORIZONTAL_SPACING,
  },
  itemInfoText: {
    fontFamily: FONTS.Regular,
    fontSize: fpx(12),
    color: COLORS.oliveBlack,
    marginTop: vpx(8),
    paddingRight: 2 * STD_HORIZONTAL_SPACING,
  },
  itemVoteText: {
    fontFamily: FONTS.Regular,
    fontSize: fpx(12),
    color: COLORS.quickSilver,
    marginTop: vpx(8),
  },
  scrollToTopBtn: {
    backgroundColor: COLORS.oceanBlue,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    bottom: vpx(100),
    borderRadius: 1000,
  },
  scrollToTopBtnHitSlop: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
  loaderView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  errorContainer: {
    backgroundColor: COLORS.fullWhite,
    paddingVertical: vpx(24),
    marginVertical: vpx(24),
    borderRadius: 8,
    height: SCREEN_HEIGHT / 2,
    justifyContent: 'center',
  },
});

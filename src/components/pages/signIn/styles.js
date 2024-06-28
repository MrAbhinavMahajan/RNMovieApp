import {StyleSheet} from 'react-native';
import {fpx, vpx} from '../../../libraries/responsive-pixels';
import {
  STD_HORIZONTAL_SPACING,
  STD_SCREEN_COLOR,
  STD_VERTICAL_SPACING,
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
    flexGrow: 1,
    gap: vpx(8),
    paddingBottom: vpx(120),
  },
  widgetView: {
    backgroundColor: COLORS.fullWhite,
  },
  headerView: {
    backgroundColor: COLORS.success800,
    borderRadius: vpx(8),
    paddingBottom: vpx(24),
  },
  containerView: {
    flex: 1,
    paddingTop: STD_VERTICAL_SPACING,
    paddingBottom: vpx(46),
  },
  pageTitle: {
    fontFamily: FONTS.BebasNeueRegular,
    color: COLORS.fullBlack,
    fontSize: fpx(48),
    marginHorizontal: STD_HORIZONTAL_SPACING,
  },
  ctaLabelTitleText: {
    fontFamily: FONTS.BebasNeueRegular,
    color: COLORS.fullBlack,
    fontSize: fpx(24),
    marginHorizontal: STD_HORIZONTAL_SPACING,
  },
  ctaView: {
    borderWidth: 1,
    paddingVertical: vpx(12),
    fontSize: vpx(16),
    backgroundColor: COLORS.success800,
    marginHorizontal: STD_HORIZONTAL_SPACING,
    borderRadius: vpx(8),
    alignItems: 'center',
    marginTop: STD_VERTICAL_SPACING,
  },
  ctaTitleText: {
    fontFamily: FONTS.Medium,
    fontSize: fpx(16),
    color: COLORS.fullWhite,
  },
  guideView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    justifyContent: 'center',
    marginTop: vpx(16),
    marginBottom: vpx(24),
  },
  guideViewTitleText: {
    fontFamily: FONTS.Bold,
    fontSize: fpx(14),
    color: COLORS.fullWhite,
  },
  guideViewSubtitleText: {
    marginTop: vpx(4),
    fontFamily: FONTS.Regular,
    fontSize: fpx(16),
    color: COLORS.lightGray,
  },
  scrollToTopBtn: {
    backgroundColor: COLORS.success800,
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
});

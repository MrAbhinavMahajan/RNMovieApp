import {StyleSheet} from 'react-native';
import {fpx, vpx} from '../../../libraries/responsive-pixels';
import {COLORS} from '../../../constants/Colors';
import {
  STD_HORIZONTAL_SPACING,
  STD_SCREEN_COLOR,
  STD_VERTICAL_SPACING,
  STYLES,
} from '../../../constants/Styles';
import {FONTS} from '../../../constants/Fonts';

export const styles = StyleSheet.create({
  profileCardView: {
    backgroundColor: COLORS.transparent,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageView: {
    height: vpx(80),
    width: vpx(80),
    marginRight: STD_HORIZONTAL_SPACING,
    marginVertical: STD_VERTICAL_SPACING,
    backgroundColor: COLORS.transparent,
  },
  profileImage: {
    borderRadius: 1000,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.fullWhite,
  },
  usernameText: {
    flex: 1,
    fontFamily: FONTS.BebasNeueRegular,
    color: COLORS.fullBlack,
    fontSize: fpx(32),
  },
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
  },
  screenScrollableView: {
    gap: vpx(8),
    paddingBottom: vpx(200),
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
  pageCtaView: {
    backgroundColor: COLORS.fullWhite,
    paddingVertical: STD_VERTICAL_SPACING,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
  },
  pageCtaText: {
    color: COLORS.red,
  },
});

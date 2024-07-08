import {StyleSheet} from 'react-native';
import {STD_HORIZONTAL_SPACING, STD_VERTICAL_SPACING} from '@constants/Styles';
import {fpx, hpx, vpx} from '@libraries/responsive-pixels';
import {COLORS} from '@constants/Colors';
import {FONTS} from '@constants/Fonts';

export const styles = StyleSheet.create({
  containerView: {
    width: '100%',
    paddingTop: STD_VERTICAL_SPACING,
  },
  scrollableContentView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: hpx(8),
    // paddingBottom: STD_VERTICAL_SPACING,
  },
  loaderView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  utilsContainer: {
    backgroundColor: COLORS.fullWhite,
    paddingVertical: vpx(24),
    borderRadius: 8,
    height: vpx(200),
    justifyContent: 'center',
  },
  reviewCardView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: vpx(8),
    backgroundColor: COLORS.fullWhite,
    paddingVertical: STD_VERTICAL_SPACING,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    borderColor: COLORS.azureishWhite,
  },
  reviewTitleText: {
    fontSize: fpx(16),
    color: COLORS.oliveBlack,
    fontFamily: FONTS.Bold,
  },
  reviewText: {
    fontSize: fpx(14),
    color: COLORS.oliveBlack,
    fontFamily: FONTS.Medium,
    marginTop: STD_VERTICAL_SPACING,
  },
  reviewCTAText: {
    fontSize: fpx(16),
    color: COLORS.oliveBlack,
    fontFamily: FONTS.Bold,
    marginTop: STD_VERTICAL_SPACING,
    alignSelf: 'flex-end',
  },
});

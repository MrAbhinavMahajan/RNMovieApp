import {StyleSheet} from 'react-native';
import {STD_HORIZONTAL_SPACING, STD_VERTICAL_SPACING} from '@constants/Styles';
import {fpx, hpx, vpx} from '@libraries/responsive-pixels';
import {COLORS} from '@constants/Colors';
import {FONTS} from '@constants/Fonts';

export const styles = StyleSheet.create({
  containerView: {
    backgroundColor: COLORS.fullWhite,
    paddingTop: STD_VERTICAL_SPACING,
    paddingBottom: vpx(24),
  },
  scrollableContentView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: hpx(8),
    paddingTop: STD_VERTICAL_SPACING,
  },
  loaderView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  headerView: {
    paddingLeft: STD_HORIZONTAL_SPACING,
    paddingRight: hpx(8),
  },
  utilsContainer: {
    backgroundColor: COLORS.antiFlashWhite,
    paddingVertical: vpx(24),
    marginHorizontal: STD_HORIZONTAL_SPACING,
    borderRadius: 8,
    marginTop: vpx(10),
  },
  reviewCardView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: vpx(8),
    backgroundColor: COLORS.fullWhite,
    paddingVertical: STD_VERTICAL_SPACING,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    borderColor: COLORS.azureishWhite,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
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

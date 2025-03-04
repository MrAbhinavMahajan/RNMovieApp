import {StyleSheet} from 'react-native';
import {
  STD_HORIZONTAL_SPACING,
  STD_SCREEN_COLOR,
  STD_VERTICAL_SPACING,
  STYLES,
} from '@constants/Styles';
import {fpx, hpx, vpx} from '@libraries/responsive-pixels';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@utilities/App';
import {COLORS} from '@constants/Colors';

export const styles = StyleSheet.create({
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
  },
  scrollableContentView: {
    paddingBottom: vpx(200),
    flexGrow: 1,
  },
  columnWrapperView: {
    gap: hpx(8),
  },
  loaderView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  scrollToTopBtn: {
    backgroundColor: COLORS.oceanBlue,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    bottom: vpx(60),
    borderRadius: 1000,
  },
  scrollToTopBtnHitSlop: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
  errorContainer: {
    backgroundColor: COLORS.fullWhite,
    paddingVertical: vpx(24),
    marginVertical: vpx(24),
    borderRadius: 8,
    height: SCREEN_HEIGHT / 2,
    justifyContent: 'center',
  },
  floatingContentGradientView: {
    position: 'absolute',
    zIndex: 1,
    width: SCREEN_WIDTH,
  },
  floatingContentView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    paddingVertical: STD_VERTICAL_SPACING,
  },
});

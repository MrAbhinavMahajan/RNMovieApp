import {StyleSheet} from 'react-native';
import {
  STD_HORIZONTAL_SPACING,
  STD_SCREEN_COLOR,
  STYLES,
} from '../../../constants/Styles';
import {hpx, vpx} from '../../../libraries/responsive-pixels';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../utilities/AppUtils';
import {COLORS} from '../../../constants/Colors';

export const styles = StyleSheet.create({
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
  },
  scrollableContentView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: hpx(8),
    paddingBottom: vpx(200),
    flexGrow: 1,
  },
  columnWrapperView: {
    gap: hpx(8),
  },
  moviePoster: {
    width: SCREEN_WIDTH / 3 - STD_HORIZONTAL_SPACING,
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
});

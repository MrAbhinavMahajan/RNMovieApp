import {StyleSheet} from 'react-native';
import {
  MOVIE_GRID_ITEM_ASPECT_RATIO,
  MOVIE_GRID_ITEM_HORIZONTAL_GAP,
  MOVIE_GRID_ITEM_VERTICAL_GAP,
  STD_HORIZONTAL_SPACING,
  STD_THEME_COLOR,
  STD_VERTICAL_SPACING,
} from '@constants/Styles';
import {hpx, vpx} from '@libraries/responsive-pixels';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@utilities/App';
import {COLORS} from '@constants/Colors';

export const styles = StyleSheet.create({
  containerView: {
    height: '100%',
    width: '100%',
    paddingTop: STD_VERTICAL_SPACING,
  },
  headerView: {
    paddingLeft: STD_HORIZONTAL_SPACING,
    paddingRight: hpx(8),
  },
  scrollableContentView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: MOVIE_GRID_ITEM_VERTICAL_GAP,
    paddingBottom: vpx(120),
    flexGrow: 1,
  },
  columnWrapperView: {
    gap: MOVIE_GRID_ITEM_HORIZONTAL_GAP,
  },
  moviePoster: {
    width: SCREEN_WIDTH / 3 - STD_HORIZONTAL_SPACING,
    aspectRatio: MOVIE_GRID_ITEM_ASPECT_RATIO,
    borderRadius: vpx(4),
    overflow: 'hidden',
  },
  scrollToTopBtn: {
    backgroundColor: STD_THEME_COLOR,
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

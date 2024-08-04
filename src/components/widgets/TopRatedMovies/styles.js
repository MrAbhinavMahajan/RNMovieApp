import {StyleSheet} from 'react-native';
import {
  MOVIE_GRID_ITEM_ASPECT_RATIO,
  MOVIE_GRID_ITEM_HORIZONTAL_GAP,
  MOVIE_GRID_ITEM_WIDTH,
  STD_HORIZONTAL_SPACING,
  STD_VERTICAL_SPACING,
} from '@constants/Styles';
import {hpx, vpx} from '@libraries/responsive-pixels';
import {COLORS} from '@constants/Colors';

export const styles = StyleSheet.create({
  containerView: {
    backgroundColor: COLORS.fullWhite,
    paddingTop: STD_VERTICAL_SPACING,
    paddingBottom: vpx(24),
  },
  headerView: {
    paddingLeft: STD_HORIZONTAL_SPACING,
    paddingRight: hpx(8),
  },
  scrollableContentView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: MOVIE_GRID_ITEM_HORIZONTAL_GAP,
    flexGrow: 1,
    marginTop: vpx(10),
  },
  moviePoster: {
    width: MOVIE_GRID_ITEM_WIDTH,
    aspectRatio: MOVIE_GRID_ITEM_ASPECT_RATIO,
    borderRadius: vpx(4),
    overflow: 'hidden',
  },
  errorContainer: {
    backgroundColor: COLORS.antiFlashWhite,
    paddingVertical: vpx(24),
    marginHorizontal: STD_HORIZONTAL_SPACING,
    borderRadius: 8,
    marginTop: vpx(10),
  },
});

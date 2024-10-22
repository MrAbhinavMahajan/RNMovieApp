import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@utilities/App';
import {hpx, vpx} from '@libraries/responsive-pixels';
import {COLORS} from './Colors';
export const STYLES = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  fullHeightWidth: {
    height: '100%',
    width: '100%',
  },
  fullScreenHeight: {
    height: SCREEN_HEIGHT,
  },
  fullScreenWidth: {
    width: SCREEN_WIDTH,
  },
  fullScreenHeightScreenWidth: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexItemsFullyCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexCoAxialItemsCenter: {
    alignItems: 'center',
  },
  flexMainAxisItemsCenter: {
    justifyContent: 'center',
  },
  flexMainAxisItemsSpaceBetween: {
    justifyContent: 'space-between',
  },
  textAlignHorizontallyCenter: {
    textAlign: 'center',
  },
  textAlignVerticallyCenter: {
    textAlignVertical: 'center',
  },
  textFullyCentered: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  flex01: {
    flex: 1,
  },
  flex02: {
    flex: 2,
  },
  flex03: {
    flex: 3,
  },
});

export const STD_HORIZONTAL_SPACING = hpx(8);
export const STD_VERTICAL_SPACING = vpx(16);
export const STD_SCREEN_COLOR = COLORS.antiFlashWhite;
export const STD_ACTIVITY_COLOR = COLORS.fullBlack;
export const MOVIE_GRID_ITEM_VERTICAL_GAP = vpx(4);
export const MOVIE_GRID_ITEM_HORIZONTAL_GAP = vpx(4);
export const MOVIE_GRID_ITEM_WIDTH = hpx(116);
export const MOVIE_GRID_ITEM_ASPECT_RATIO = 3.2 / 5;

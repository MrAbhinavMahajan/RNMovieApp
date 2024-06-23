import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utilities/AppUtils';
import {hpx, vpx} from '../libraries/responsive-pixels';
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

export const STD_HORIZONTAL_SPACING = hpx(16);
export const STD_VERTICAL_SPACING = vpx(16);
export const STD_SCREEN_COLOR = COLORS.antiFlashWhite;

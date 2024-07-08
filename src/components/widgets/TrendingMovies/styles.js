import {StyleSheet} from 'react-native';
import {STD_HORIZONTAL_SPACING} from '@constants/Styles';
import {vpx} from '@libraries/responsive-pixels';
import {COLORS} from '@constants/Colors';
import {SCREEN_HEIGHT} from '@utilities/App';

export const styles = StyleSheet.create({
  containerView: {
    minHeight: SCREEN_HEIGHT / 2.5,
  },
  moviePoster: {
    aspectRatio: 3.5 / 5,
    borderRadius: vpx(24),
    overflow: 'hidden',
  },
  errorContainer: {
    backgroundColor: COLORS.antiFlashWhite,
    paddingVertical: vpx(24),
    marginHorizontal: STD_HORIZONTAL_SPACING,
    borderRadius: 8,
  },
  loaderView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
});

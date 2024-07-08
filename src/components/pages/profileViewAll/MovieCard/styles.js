import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '@utilities/App';
import {STD_HORIZONTAL_SPACING} from '@constants/Styles';
import {vpx} from '@libraries/responsive-pixels';

export const styles = StyleSheet.create({
  moviePosterContainer: {
    width: SCREEN_WIDTH / 3 - STD_HORIZONTAL_SPACING,
    aspectRatio: 3 / 5,
    borderRadius: vpx(8),
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
  },
  moviePoster: {
    height: '100%',
    width: '100%',
  },
  moviePosterGradient: {
    opacity: 1,
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    height: '100%',
    aspectRatio: 3 / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

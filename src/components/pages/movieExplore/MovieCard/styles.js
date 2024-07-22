import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '~/src/utilities/App';

export const styles = StyleSheet.create({
  moviePoster: {
    width: SCREEN_WIDTH,
    aspectRatio: 3 / 5,
    overflow: 'hidden',
  },
});

import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@utilities/App';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000',
  },
  moviePoster: {
    width: SCREEN_WIDTH,
    opacity: 0.5,
  },
});
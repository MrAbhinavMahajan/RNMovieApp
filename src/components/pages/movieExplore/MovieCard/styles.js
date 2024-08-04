import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@utilities/App';
import {COLORS} from '@constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    backgroundColor: COLORS.fullBlack,
  },
  moviePoster: {
    width: SCREEN_WIDTH,
  },
});

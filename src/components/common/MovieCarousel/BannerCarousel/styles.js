import {StyleSheet} from 'react-native';
import {COLORS} from '~/src/constants/Colors';
import {SCREEN_WIDTH} from '~/src/utilities/App';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.fullBlack,
  },
  maskedGradient: {
    flex: 1,
    width: '100%',
  },
  gradientView: {
    ...StyleSheet.absoluteFill,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.transparent,
  },
});

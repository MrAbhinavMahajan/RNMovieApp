import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/Colors';
import {STD_HORIZONTAL_SPACING, STD_VERTICAL_SPACING} from '@constants/Styles';
import {SCREEN_WIDTH} from '@utilities/App';
import {vpx} from '@libraries/responsive-pixels';

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
  floatingContentView: {
    position: 'absolute',
    zIndex: 1,
    bottom: STD_VERTICAL_SPACING,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    width: SCREEN_WIDTH,
  },
  paginationContainer: {
    alignSelf: 'flex-end',
  },
});

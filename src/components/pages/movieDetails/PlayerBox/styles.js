import {StyleSheet} from 'react-native';
import {COLORS} from '~/src/constants/Colors';
import {STD_HORIZONTAL_SPACING} from '~/src/constants/Styles';
import {vpx} from '~/src/libraries/responsive-pixels';
import {SCREEN_WIDTH} from '~/src/utilities/App';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.fullBlack,
    width: SCREEN_WIDTH - 2 * STD_HORIZONTAL_SPACING,
    alignSelf: 'center',
    borderRadius: vpx(16),
    overflow: 'hidden',
  },
});

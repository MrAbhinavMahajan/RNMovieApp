import {StyleSheet} from 'react-native';
import {
  STD_HORIZONTAL_SPACING,
  STD_SCREEN_COLOR,
  STD_VERTICAL_SPACING,
  STYLES,
} from '../../../constants/Styles';
import {hpx} from '../../../libraries/responsive-pixels';

export const styles = StyleSheet.create({
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
  },
  scrollableContentView: {
    marginTop: STD_VERTICAL_SPACING,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: hpx(8),
  },
  columnWrapperView: {
    gap: hpx(8),
  },
});

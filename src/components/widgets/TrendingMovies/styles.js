import {StyleSheet} from 'react-native';
import {STD_HORIZONTAL_SPACING} from '../../../constants/Styles';
import {hpx} from '../../../libraries/responsive-pixels';

export const styles = StyleSheet.create({
  scrollableContentView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: hpx(8),
  },
});

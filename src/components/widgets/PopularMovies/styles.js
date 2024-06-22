import {StyleSheet} from 'react-native';
import {STD_HORIZONTAL_SPACING} from '../../../constants/Styles';
import {hpx, vpx} from '../../../libraries/responsive-pixels';

export const styles = StyleSheet.create({
  headerView: {
    paddingLeft: STD_HORIZONTAL_SPACING,
    paddingRight: hpx(8),
  },
  scrollableContentView: {
    marginTop: vpx(16),
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: hpx(8),
  },
  columnWrapperView: {
    gap: hpx(8),
  },
});

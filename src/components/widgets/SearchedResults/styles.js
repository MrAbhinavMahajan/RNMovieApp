import {StyleSheet} from 'react-native';
import {STD_HORIZONTAL_SPACING} from '../../../constants/Styles';
import {hpx, vpx} from '../../../libraries/responsive-pixels';
import {SCREEN_WIDTH} from '../../../utilities/AppUtils';

export const styles = StyleSheet.create({
  containerView: {
    zIndex: 1,
    flex: 1,
  },
  headerView: {
    paddingLeft: STD_HORIZONTAL_SPACING,
    paddingRight: hpx(8),
  },
  scrollableContentView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: hpx(8),
    paddingBottom: vpx(200),
    flexGrow: 1,
  },
  columnWrapperView: {
    gap: hpx(8),
  },
  movieItem: {
    width: SCREEN_WIDTH / 3 - STD_HORIZONTAL_SPACING,
  },
});

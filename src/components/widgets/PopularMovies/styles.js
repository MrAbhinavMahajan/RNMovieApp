import {StyleSheet} from 'react-native';
import {STD_HORIZONTAL_SPACING} from '../../../constants/Styles';
import {hpx, vpx} from '../../../libraries/responsive-pixels';
import {COLORS} from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../utilities/AppUtils';

export const styles = StyleSheet.create({
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
  scrollToTopBtn: {
    backgroundColor: COLORS.oceanBlue,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    bottom: vpx(120),
    borderRadius: 1000,
    padding: vpx(3),
  },
  movieItem: {
    width: SCREEN_WIDTH / 3 - STD_HORIZONTAL_SPACING,
  },
});

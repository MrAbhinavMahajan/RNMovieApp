import {StyleSheet} from 'react-native';
import {
  STD_HORIZONTAL_SPACING,
  STD_SCREEN_COLOR,
  STD_VERTICAL_SPACING,
  STYLES,
} from '../../../constants/Styles';
import {hpx, vpx} from '../../../libraries/responsive-pixels';
import {SCREEN_WIDTH} from '../../../utilities/AppUtils';

export const styles = StyleSheet.create({
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
  },
  scrollableContentView: {
    marginTop: STD_VERTICAL_SPACING,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: hpx(8),
    paddingBottom: vpx(200),
    flexGrow: 1,
  },
  columnWrapperView: {
    gap: hpx(8),
  },
  moviePoster: {
    width: SCREEN_WIDTH / 3 - STD_HORIZONTAL_SPACING,
  },
});

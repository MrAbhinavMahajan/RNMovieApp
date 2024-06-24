import {StyleSheet} from 'react-native';
import {
  STD_HORIZONTAL_SPACING,
  STD_SCREEN_COLOR,
  STYLES,
} from '../../../constants/Styles';
import {vpx} from '../../../libraries/responsive-pixels';
import {COLORS} from '../../../constants/Colors';

export const styles = StyleSheet.create({
  headerView: {
    left: STD_HORIZONTAL_SPACING,
    backgroundColor: COLORS.lotionWhite60,
    position: 'absolute',
    zIndex: 1,
    borderRadius: 1000,
    padding: vpx(3),
  },
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
  },
  screenScrollableView: {
    flexGrow: 1,
    gap: vpx(8),
  },
});

import {StyleSheet} from 'react-native';
import {
  STD_HORIZONTAL_SPACING,
  STD_SCREEN_COLOR,
  STD_VERTICAL_SPACING,
  STYLES,
} from '@constants/Styles';
import {vpx} from '@libraries/responsive-pixels';
import {COLORS} from '@constants/Colors';
import {SCREEN_WIDTH} from '~/src/utilities/App';

export const styles = StyleSheet.create({
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
  },
  screenScrollableView: {
    flexGrow: 1,
    gap: vpx(8),
  },
  footerView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    paddingBottom: vpx(24),
    paddingTop: vpx(12),
    backgroundColor: COLORS.fullWhite,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  dateTimePicker: {
    backgroundColor: COLORS.fullWhite,
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    width: SCREEN_WIDTH,
    paddingVertical: STD_VERTICAL_SPACING,
  },
});

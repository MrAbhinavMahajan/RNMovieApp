import {StyleSheet} from 'react-native';
import {STD_HORIZONTAL_SPACING} from '@constants/Styles';
import {vpx} from '@libraries/responsive-pixels';
import {COLORS} from '@constants/Colors';
import {SCREEN_WIDTH} from '@utilities/App';

export const styles = StyleSheet.create({
  containerView: {
    minHeight: SCREEN_WIDTH,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.fullWhite,
    borderRadius: vpx(8),
    justifyContent: 'center',
    paddingVertical: vpx(24),
    marginHorizontal: STD_HORIZONTAL_SPACING,
  },
  loaderView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  noDataView: {
    backgroundColor: COLORS.fullWhite,
  },
});

import {StyleSheet} from 'react-native';
import {
  STD_HORIZONTAL_SPACING,
  STD_SCREEN_COLOR,
  STYLES,
} from '@constants/Styles';
import {vpx} from '@libraries/responsive-pixels';
import {COLORS} from '@constants/Colors';
import {SCREEN_WIDTH} from '@utilities/App';

export const styles = StyleSheet.create({
  headerGradientView: {
    opacity: 0.2,
    borderRadius: 20,
  },
  headerView: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  leftIcon: {
    marginLeft: STD_HORIZONTAL_SPACING,
    backgroundColor: COLORS.lotionWhite60,
    borderRadius: 1000,
    padding: vpx(8),
  },
  headerTitle: {
    flex: 1,
  },
  rightIcon: {
    marginRight: STD_HORIZONTAL_SPACING,
    backgroundColor: COLORS.lotionWhite60,
    borderRadius: 8,
    padding: vpx(8),
  },
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
  },
  screenScrollableView: {
    flexGrow: 1,
    gap: vpx(8),
  },
  movieCTAView: {
    marginTop: vpx(12),
    flexDirection: 'row',
  },
  movieCTA: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: STD_HORIZONTAL_SPACING,
  },
});

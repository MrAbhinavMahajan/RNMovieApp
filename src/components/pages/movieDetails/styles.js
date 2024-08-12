import {StyleSheet} from 'react-native';
import {
  STD_HORIZONTAL_SPACING,
  STD_SCREEN_COLOR,
  STD_VERTICAL_SPACING,
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
  detailsView: {
    backgroundColor: COLORS.fullWhite,
    paddingTop: STD_VERTICAL_SPACING,
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
  secondaryCTA: {
    marginTop: vpx(8),
  },
});

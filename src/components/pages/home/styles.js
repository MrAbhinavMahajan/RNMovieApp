import {StyleSheet} from 'react-native';
import {vpx} from '../../../libraries/responsive-pixels';
import {COLORS} from '../../../constants/Colors';
import {STD_SCREEN_COLOR, STYLES} from '../../../constants/Styles';

export const styles = StyleSheet.create({
  headerLeftCTA: {
    height: vpx(32),
    aspectRatio: 1,
  },
  headerLeftCTAImage: {
    borderRadius: 1000,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.fullWhite,
  },
  headerLeftCTAShadow: {
    shadowColor: COLORS.fullBlack,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
  },
  pageView: {
    flex: 1,
  },
  listContentView: {
    ...STYLES.flexGrow,
    gap: vpx(16),
    paddingBottom: vpx(150),
    paddingTop: vpx(16),
  },
});

import {StyleSheet} from 'react-native';
import {STD_SCREEN_COLOR, STYLES} from '../../../constants/Styles';
import {COLORS} from '../../../constants/Colors';
import {vpx} from '../../../libraries/responsive-pixels';

export const styles = StyleSheet.create({
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
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
});

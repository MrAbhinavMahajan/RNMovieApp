import {StyleSheet} from 'react-native';
import {STD_SCREEN_COLOR, STYLES} from '@constants/Styles';
import {vpx} from '@libraries/responsive-pixels';

export const styles = StyleSheet.create({
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
  },
  screenScrollableView: {
    gap: vpx(8),
    paddingBottom: vpx(200),
  },
});

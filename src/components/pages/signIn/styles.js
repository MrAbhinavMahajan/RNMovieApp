import {StyleSheet} from 'react-native';
import {vpx} from '../../../libraries/responsive-pixels';
import {STD_SCREEN_COLOR, STYLES} from '../../../constants/Styles';

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

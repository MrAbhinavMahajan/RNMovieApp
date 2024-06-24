import {StyleSheet} from 'react-native';
import {STD_SCREEN_COLOR, STYLES} from '../../../constants/Styles';

export const styles = StyleSheet.create({
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
  },
  lottieView: {
    flex: 1,
  },
});

import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/Colors';

export const styles = StyleSheet.create({
  imageView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.oceanBlue,
  },
  loader: {
    position: 'absolute',
    zIndex: 1000,
    alignSelf: 'center',
  },
});

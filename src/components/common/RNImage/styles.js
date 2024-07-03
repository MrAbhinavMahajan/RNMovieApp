import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/Colors';
import {fpx} from '../../../libraries/responsive-pixels';
import {FONTS} from '../../../constants/Fonts';

export const styles = StyleSheet.create({
  imageView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.fullWhite,
  },
  errorFallback: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorFallbackText: {
    fontSize: fpx(34),
    color: COLORS.fullBlack,
    fontFamily: FONTS.Bold,
  },
  loader: {
    position: 'absolute',
    zIndex: 1000,
    alignSelf: 'center',
  },
});

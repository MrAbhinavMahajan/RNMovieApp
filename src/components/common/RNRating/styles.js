import {StyleSheet} from 'react-native';
import {COLORS} from '~/src/constants/Colors';
import {FONTS} from '~/src/constants/Fonts';
import {fpx} from '~/src/libraries/responsive-pixels';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: FONTS.Medium,
    fontSize: fpx(12),
    color: COLORS.fullWhite,
  },
});

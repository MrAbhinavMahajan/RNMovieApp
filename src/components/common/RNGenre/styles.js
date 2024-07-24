import {StyleSheet} from 'react-native';
import {COLORS} from '~/src/constants/Colors';
import {fpx} from '~/src/libraries/responsive-pixels';

export const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: fpx(12),
    color: COLORS.fullWhite,
  },
});

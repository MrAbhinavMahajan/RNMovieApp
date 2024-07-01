import {StyleSheet} from 'react-native';
import {STD_VERTICAL_SPACING} from '../../../../constants/Styles';
import {COLORS} from '../../../../constants/Colors';

export const styles = StyleSheet.create({
  containerView: {
    backgroundColor: COLORS.oceanBlue,
    paddingBottom: 2 * STD_VERTICAL_SPACING,
    justifyContent: 'flex-end',
  },
});

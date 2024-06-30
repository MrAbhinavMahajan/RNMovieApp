import {StyleSheet} from 'react-native';
import {fpx} from '../../../libraries/responsive-pixels';
import {FONTS} from '../../../constants/Fonts';
import {COLORS} from '../../../constants/Colors';

export const styles = StyleSheet.create({
  tabBarItem: {flexGrow: 1},
  tabBarIndicator: {
    backgroundColor: COLORS.oceanBlue,
  },
  tabBarTitle: {
    fontFamily: FONTS.Medium,
    fontSize: fpx(14),
  },
});

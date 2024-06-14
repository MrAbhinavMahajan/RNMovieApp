import {StyleSheet} from 'react-native';
import {vpx} from '../../../libraries/responsive-pixels';
import {COLORS} from '../../../constants/Colors';
import {STD_HORIZONTAL_SPACING} from '../../../constants/Styles';

export const styles = StyleSheet.create({
  headerLeftCTA: {
    height: vpx(32),
    aspectRatio: 1,
  },
  headerLeftCTAImage: {
    borderRadius: 1000,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.fullWhite,
  },
  headerLeftCTAShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  pageContentView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
  },
});

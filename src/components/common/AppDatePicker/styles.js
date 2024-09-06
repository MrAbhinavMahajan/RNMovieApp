import {StyleSheet} from 'react-native';
import {fpx, hpx, vpx} from '@libraries/responsive-pixels';
import {FONTS} from '@constants/Fonts';

export const styles = StyleSheet.create({
  containerView: {
    marginVertical: vpx(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimePickerTitleText: {
    fontSize: fpx(16),
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.SemiBold,
    marginHorizontal: hpx(6),
  },
  dateTimePickerSubtitleText: {
    fontSize: fpx(16),
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.Regular,
  },
});

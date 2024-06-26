import {StyleSheet} from 'react-native';
import {fpx, hpx, vpx} from '../../../libraries/responsive-pixels';
import {FONTS} from '../../../constants/Fonts';
import {COLORS} from '../../../constants/Colors';
import {
  STD_HORIZONTAL_SPACING,
  STD_SCREEN_COLOR,
} from '../../../constants/Styles';

export const styles = StyleSheet.create({
  headerView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: vpx(16),
    justifyContent: 'space-between',
    backgroundColor: STD_SCREEN_COLOR,
  },
  headerLeftInfoView: {},
  headerCenteredInfoView: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: STD_HORIZONTAL_SPACING,
  },
  headerRightInfoView: {},
  headerTitle: {
    marginLeft: hpx(8),
    fontFamily: FONTS.Medium,
    fontSize: fpx(16),
  },
  headerDivider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: COLORS.fullBlack,
  },
});

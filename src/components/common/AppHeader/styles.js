import {StyleSheet} from 'react-native';
import {fpx, hpx, vpx} from '../../../libraries/responsive-pixels';
import {FONTS} from '../../../constants/Fonts';
import {COLORS} from '../../../constants/Colors';
import {
  STD_HORIZONTAL_SPACING,
  STD_SCREEN_COLOR,
} from '../../../constants/Styles';

export const styles = StyleSheet.create({
  headerView: (transparentBackgroundEnabled, safePaddingEnabled) => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: vpx(16),
    justifyContent: 'space-between',
    backgroundColor: transparentBackgroundEnabled
      ? COLORS.transparent
      : STD_SCREEN_COLOR,
    paddingHorizontal: safePaddingEnabled ? STD_HORIZONTAL_SPACING : 0,
  }),
  headerCenteredInfoView: (multipleCTAModeEnabled = false) => ({
    flex: 1,
    alignItems: multipleCTAModeEnabled ? 'flex-start' : 'center',
    marginHorizontal: STD_HORIZONTAL_SPACING,
  }),
  headerTitle: {
    marginLeft: hpx(8),
    fontFamily: FONTS.SemiBold,
    fontSize: fpx(18),
    color: COLORS.fullBlack,
  },
  headerDivider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: COLORS.fullBlack,
  },
  gradientView: {
    position: 'absolute',
    zIndex: -1,
    bottom: 0,
  },
});

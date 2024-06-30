import {StyleSheet} from 'react-native';
import {STD_HORIZONTAL_SPACING} from '../../../../constants/Styles';
import {hpx, vpx} from '../../../../libraries/responsive-pixels';
import {COLORS} from '../../../../constants/Colors';
import {SCREEN_HEIGHT} from '../../../../utilities/App';

export const styles = StyleSheet.create({
  containerView: {
    backgroundColor: COLORS.oceanBlue,
    paddingBottom: vpx(8),
    borderRadius: vpx(8),
    minHeight: SCREEN_HEIGHT / 2.1,
    justifyContent: 'flex-end',
  },
  scrollableContentView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: hpx(8),
    flexGrow: 1,
  },
  moviePoster: {
    borderWidth: 0,
  },
  loaderView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  errorContainer: {
    backgroundColor: COLORS.antiFlashWhite,
    marginVertical: vpx(24),
    marginHorizontal: STD_HORIZONTAL_SPACING,
    borderRadius: 8,
    justifyContent: 'center',
    flex: 1,
  },
});

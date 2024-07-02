import {StyleSheet} from 'react-native';
import {
  STD_HORIZONTAL_SPACING,
  STD_VERTICAL_SPACING,
} from '../../../constants/Styles';
import {hpx, vpx} from '../../../libraries/responsive-pixels';
import {COLORS} from '../../../constants/Colors';

export const styles = StyleSheet.create({
  containerView: {
    backgroundColor: COLORS.fullWhite,
    paddingTop: STD_VERTICAL_SPACING,
    paddingBottom: vpx(24),
  },
  headerView: {
    paddingLeft: STD_HORIZONTAL_SPACING,
    paddingRight: hpx(8),
  },
  scrollableContentView: {
    paddingHorizontal: STD_HORIZONTAL_SPACING,
    gap: hpx(8),
    flexGrow: 1,
    marginTop: vpx(10),
  },
  moviePosterContainer: {
    width: hpx(80),
    aspectRatio: 3 / 5,
    borderRadius: vpx(8),
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
  },
  moviePoster: {
    height: '100%',
    width: '100%',
  },
  moviePosterGradient: {
    opacity: 1,
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    height: '100%',
    aspectRatio: 3 / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: COLORS.antiFlashWhite,
    paddingVertical: vpx(24),
    marginHorizontal: STD_HORIZONTAL_SPACING,
    borderRadius: 8,
    marginTop: vpx(10),
  },
});

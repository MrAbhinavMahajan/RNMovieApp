import {StyleSheet} from 'react-native';
import {vpx} from '@libraries/responsive-pixels';
import {STD_SCREEN_COLOR, STD_THEME_COLOR, STYLES} from '@constants/Styles';

export const styles = StyleSheet.create({
  screenView: {
    ...STYLES.flex01,
    backgroundColor: STD_SCREEN_COLOR,
  },
  screenScrollableView: {
    gap: vpx(8),
    paddingBottom: vpx(200),
  },
  scrollToTopBtn: {
    backgroundColor: STD_THEME_COLOR,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    bottom: vpx(100),
    borderRadius: 1000,
  },
  scrollToTopBtnHitSlop: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
});

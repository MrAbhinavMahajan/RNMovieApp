import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {STD_VERTICAL_SPACING} from '@constants/Styles';
import {COLORS} from '@constants/Colors';
import {styles} from './styles';
import TrendingMoviesWidget from '@components/widgets/TrendingMovies';

const HomeScreenHeader = () => {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[COLORS.transparent, COLORS.fullBlack]}
      style={[
        styles.containerView,
        {paddingTop: insets.top + STD_VERTICAL_SPACING},
      ]}>
      <TrendingMoviesWidget />
    </LinearGradient>
  );
};

export default HomeScreenHeader;

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {IconSize, MaterialIcon} from '@components/common/RNIcon';
import {COLORS} from '@constants/Colors';
import {ActivityIndicator} from 'react-native';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
import AppCTA from '@components/common/AppCTA';
import RNText from '@components/common/RNText';
import useWatchlist from '@hooks/useWatchlist';
type WatchlistCTA = {
  movieId: number;
  ctaTextStyles: any;
  ctaContainerStyles: any;
  iconSize: IconSize;
};

const WatchlistCTA = ({
  movieId,
  ctaTextStyles,
  ctaContainerStyles,
  iconSize,
}: WatchlistCTA) => {
  const {isWatchlist, isFetching, toggleWatchlist} = useWatchlist(movieId);
  const scaleAnimation = useSharedValue(1);

  const onPressIn = () => {
    scaleAnimation.value = withSpring(0.5);
  };

  const onPressOut = () => {
    scaleAnimation.value = withSpring(1);
  };

  const scaleAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{scale: scaleAnimation.value}],
  }));

  return (
    <AppCTA
      style={ctaContainerStyles}
      disabled={isFetching}
      onPress={toggleWatchlist}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Animated.View style={scaleAnimatedStyles}>
        {isFetching ? (
          <ActivityIndicator color={STD_ACTIVITY_COLOR} size={'small'} />
        ) : (
          <MaterialIcon
            name={isWatchlist ? 'bookmark' : 'bookmark-outline'}
            size={iconSize}
            color={COLORS.oceanBlue}
          />
        )}
      </Animated.View>
      <RNText style={ctaTextStyles}>Watchlist</RNText>
    </AppCTA>
  );
};

export default WatchlistCTA;

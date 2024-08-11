/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import useFavorites from '@hooks/useFavorites';
import {IconSize, MaterialIcon} from '@components/common/RNIcon';
import {COLORS} from '@constants/Colors';
import {ActivityIndicator} from 'react-native';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
import AppCTA from '@components/common/AppCTA';
import RNText from '@components/common/RNText';

type FavoriteCTA = {
  movieId: number;
  ctaTextStyles: any;
  ctaContainerStyles: any;
  iconSize: IconSize;
};

const FavoriteCTA = ({
  movieId,
  ctaTextStyles,
  ctaContainerStyles,
  iconSize,
}: FavoriteCTA) => {
  const {isFavorite, isFetching, toggleFavorite} = useFavorites(movieId);
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
      onPress={toggleFavorite}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      {isFetching ? (
        <ActivityIndicator color={STD_ACTIVITY_COLOR} size={'small'} />
      ) : (
        <Animated.View style={scaleAnimatedStyles}>
          <MaterialIcon
            name={isFavorite ? 'favorite' : 'favorite-outline'}
            size={iconSize}
            color={COLORS.red}
          />
        </Animated.View>
      )}
      <RNText style={ctaTextStyles}>Favorite</RNText>
    </AppCTA>
  );
};

export default FavoriteCTA;

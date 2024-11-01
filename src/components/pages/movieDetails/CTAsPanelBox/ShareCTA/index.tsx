/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {IconSize, MaterialIcon} from '@components/common/RNIcon';
import {COLORS} from '@constants/Colors';
import AppCTA from '@components/common/AppCTA';
import RNText from '@components/common/RNText';
type ShareCTA = {
  movieId: number;
  ctaTextStyles: any;
  ctaContainerStyles: any;
  iconSize: IconSize;
  movieName: string;
};

const ShareCTA = ({
  movieName,
  movieId,
  ctaTextStyles,
  ctaContainerStyles,
  iconSize,
}: ShareCTA) => {
  const scaleAnimation = useSharedValue(1);

  const onShare = () => {};

  const onPressIn = () => {
    scaleAnimation.value = withSpring(0.8);
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
      onPress={onShare}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Animated.View style={scaleAnimatedStyles}>
        <MaterialIcon
          name={'share'}
          size={iconSize}
          color={COLORS.oliveBlack}
        />
      </Animated.View>
      <RNText style={ctaTextStyles}>Share</RNText>
    </AppCTA>
  );
};

export default ShareCTA;

import React, {useState} from 'react';
import {View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import RNText from '../RNText';
import {styles} from './styles';

type MovieOverview = {
  text: string;
  containerStyles: any;
  textStyles: any;
  ctaTextStyles: any;
};

const MovieOverview = ({
  text,
  containerStyles,
  textStyles,
  ctaTextStyles,
}: MovieOverview) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleViewMore = () => {
    setExpanded(f => !f);
  };

  if (!text) {
    return <></>;
  }
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={containerStyles}>
      <View>
        <RNText style={textStyles} numberOfLines={isExpanded ? 0 : 2}>
          {text}
        </RNText>
        <RNText
          style={[styles.ctaText, ctaTextStyles]}
          onPress={toggleViewMore}>
          {isExpanded ? 'hide' : 'see more'}
        </RNText>
      </View>
    </Animated.View>
  );
};

export default MovieOverview;

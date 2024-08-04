import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import RNText from '~/src/components/common/RNText';

type Pagination = {
  totalCount: number;
  currentCount: number;
  containerStyles?: any;
  currentCountTextStyles?: any;
  totalCountTextStyles?: any;
};

const Pagination = ({
  totalCount,
  currentCount,
  containerStyles = {},
  currentCountTextStyles = {},
  totalCountTextStyles = {},
}: Pagination) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Animated.Text
        key={`currentCount-${currentCount}`}
        style={[styles.currentPageText, currentCountTextStyles]}
        entering={FadeInUp}
        exiting={FadeInDown}>
        {currentCount}
      </Animated.Text>
      <RNText style={[styles.totalPageText, totalCountTextStyles]}>
        {' '}
        {totalCount}
      </RNText>
    </View>
  );
};

export default Pagination;

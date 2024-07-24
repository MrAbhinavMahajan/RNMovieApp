import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import RNText from '~/src/components/common/RNText';

type Pagination = {
  totalPages: number;
  currentPage: number;
};

const Pagination = ({totalPages, currentPage}: Pagination) => {
  return (
    <View style={styles.container}>
      <Animated.Text
        key={`currentPage-${currentPage}`}
        style={styles.currentPageText}
        entering={FadeInUp}
        exiting={FadeInDown}>
        {currentPage}
      </Animated.Text>
      <RNText style={styles.totalPageText}> {totalPages}</RNText>
    </View>
  );
};

export default Pagination;

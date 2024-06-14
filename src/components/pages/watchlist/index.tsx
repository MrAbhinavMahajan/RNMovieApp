import React from 'react';
import {View} from 'react-native';
import {STYLES} from '../../../constants/Styles';
import RNText from '../../common/RNText';

const WatchlistScreen = () => {
  return (
    <View style={[STYLES.flex01, STYLES.flexItemsFullyCenter]}>
      <RNText>WatchlistScreen</RNText>
    </View>
  );
};

export default WatchlistScreen;

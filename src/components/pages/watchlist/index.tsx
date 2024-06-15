import React from 'react';
import {View} from 'react-native';
import RNText from '../../common/RNText';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';

const WatchlistScreen = () => {
  return (
    <View style={styles.screenView}>
      <AppHeader />
      <RNText>WatchlistScreen</RNText>
    </View>
  );
};

export default WatchlistScreen;

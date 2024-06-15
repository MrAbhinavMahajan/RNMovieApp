import React from 'react';
import {View} from 'react-native';
import RNText from '../../common/RNText';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';

const FavoriteScreen = () => {
  return (
    <View style={styles.screenView}>
      <AppHeader />
      <RNText>FavoriteScreen</RNText>
    </View>
  );
};

export default FavoriteScreen;

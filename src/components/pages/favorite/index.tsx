import React from 'react';
import {View} from 'react-native';
import {STYLES} from '../../../constants/Styles';
import RNText from '../../common/RNText';

const FavoriteScreen = () => {
  return (
    <View style={[STYLES.flex01, STYLES.flexItemsFullyCenter]}>
      <RNText>FavoriteScreen</RNText>
    </View>
  );
};

export default FavoriteScreen;

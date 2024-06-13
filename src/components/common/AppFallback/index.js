import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import RNText from '../RNText';

const AppFallback = ({error, stackTrace}) => {
  return (
    <View style={styles.containerView}>
      <RNText>Oops, Something Went Wrong</RNText>
    </View>
  );
};

export default AppFallback;

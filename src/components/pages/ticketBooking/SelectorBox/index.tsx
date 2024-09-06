import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import SeatSelector from '../SeatSelector';
import LayoutSelector from '../LayoutSelector';

const SelectorBox = () => {
  return (
    <View style={styles.container}>
      <LayoutSelector />
      <SeatSelector />
    </View>
  );
};

export default SelectorBox;

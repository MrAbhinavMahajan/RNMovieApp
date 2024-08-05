import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

type CTAsPanelBox = {
  movieId: number;
};

const CTAsPanelBox = ({movieId}: CTAsPanelBox) => {
  return <View style={styles.container}></View>;
};

export default CTAsPanelBox;

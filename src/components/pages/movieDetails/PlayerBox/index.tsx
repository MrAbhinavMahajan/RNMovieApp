import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

type PlayerBox = {
  movieId: number;
};

const PlayerBox = ({movieId}: PlayerBox) => {
  return <View style={styles.container}></View>;
};

export default PlayerBox;

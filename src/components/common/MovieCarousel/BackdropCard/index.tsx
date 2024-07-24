import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {MovieItem} from '@constants/AppInterfaces';

type BackdropCardProps = {
  item: MovieItem;
  index: number;
  action?: () => void;
};

const BackdropCard = ({item, index, action}: BackdropCardProps) => {
  return <View style={styles.container}></View>;
};

export default BackdropCard;

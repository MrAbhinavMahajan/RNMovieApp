import React from 'react';
import {View} from 'react-native';
import {TabInfo} from '@utilities/Tabs';
import {IconSize, MaterialIcon} from '../RNIcon';
import {styles} from './styles';

const BottomTabIcon = (props: TabInfo) => {
  const {focused, color, iconName} = props;

  return (
    <View style={styles.tabIconView}>
      <MaterialIcon name={iconName} size={IconSize.large} color={color} />
      {focused && <View style={[styles.indicator, {backgroundColor: color}]} />}
    </View>
  );
};

export default BottomTabIcon;

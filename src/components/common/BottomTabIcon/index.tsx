import React from 'react';
import {View} from 'react-native';
import {TabInfo} from '../../../utilities/TabUtils';
import {IconSize, IoniIcon} from '../RNIcon';

const BottomTabIcon = (props: TabInfo) => {
  const {focused, color, size, iconName} = props;

  return (
    <View>
      <IoniIcon
        name={iconName}
        size={IconSize.large}
        color={'rgba(66, 9, 95, 1)'}
      />
    </View>
  );
};

export default BottomTabIcon;

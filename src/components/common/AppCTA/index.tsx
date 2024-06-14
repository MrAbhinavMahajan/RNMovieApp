import React from 'react';
import {TouchableOpacity} from 'react-native';

interface AppCTAProps {
  onPress: () => void;
  disabled?: boolean;
  children: any;
}

const AppCTA = (props: AppCTAProps) => {
  const {children, ...remainingProps} = props;
  return <TouchableOpacity {...remainingProps}>{children}</TouchableOpacity>;
};

export default AppCTA;

import React from 'react';
import {TouchableOpacity} from 'react-native';

interface HitSlopProps {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
interface AppCTAProps {
  onPress: () => void;
  disabled?: boolean;
  children: any;
  style?: any;
  hitSlop?: HitSlopProps;
}

const AppCTA = (props: AppCTAProps) => {
  const {children, ...remainingProps} = props;
  return <TouchableOpacity {...remainingProps}>{children}</TouchableOpacity>;
};

export default AppCTA;

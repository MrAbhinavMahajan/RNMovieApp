import React, {PropsWithChildren} from 'react';
import {Pressable} from 'react-native';

interface HitSlopProps {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
interface AppCTAProps {
  onPress: () => void;
  disabled?: boolean;
  style?: any;
  hitSlop?: HitSlopProps;
}

const AppCTA = (props: PropsWithChildren<AppCTAProps>) => {
  const {children, ...remainingProps} = props;
  return <Pressable {...remainingProps}>{children}</Pressable>;
};

export default AppCTA;

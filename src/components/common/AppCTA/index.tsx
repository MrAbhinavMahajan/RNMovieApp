import React from 'react';
import {Pressable, PressableProps} from 'react-native';

const AppCTA = (props: PressableProps) => {
  const {children, ...remainingProps} = props;
  return <Pressable {...remainingProps}>{children}</Pressable>;
};

export default AppCTA;

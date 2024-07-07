import React, {PropsWithChildren} from 'react';
import {Text} from 'react-native';
import {FONTS} from '../../../constants/Fonts';

interface RNTextProps {
  style: any;
  numberOfLines?: number;
  onPress?: () => void;
}

const RNText = (props: PropsWithChildren<RNTextProps>) => {
  const {children, style, ...textProps} = props;
  return (
    <Text
      allowFontScaling={false}
      style={[FONTS.Regular, style]}
      {...textProps}>
      {children}
    </Text>
  );
};

export default RNText;

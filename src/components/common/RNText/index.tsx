import React from 'react';
import {Text} from 'react-native';
import {FONTS} from '../../../constants/Fonts';

interface RNTextProps {
  style: any;
  children: any;
  numberOfLines?: number;
  onPress?: () => void;
}

const RNText = (props: RNTextProps) => {
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

import React from 'react';
import {Text} from 'react-native';
import {FONTS} from '../../../constants/Fonts';

const RNText = (props: any) => {
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

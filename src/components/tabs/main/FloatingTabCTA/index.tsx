import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from '@constants/Colors';
import {vpx} from '@libraries/responsive-pixels';
import {styles} from './styles';
import AppCTA from '@components/common/AppCTA';
import RNText from '@components/common/RNText';

const FLOATING_BUTTON_SIZE = vpx(60);
export const FloatingTabBG = ({color = COLORS.fullWhite, ...props}) => {
  return (
    <Svg
      width={'100%'}
      height={'100%'}
      viewBox="0 0 75 58"
      {...props}
      preserveAspectRatio="none">
      <Path
        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
        fill={color}
      />
    </Svg>
  );
};

const FloatingTabCTA = (props: any) => (
  <View
    style={[
      styles.container,
      {
        width: FLOATING_BUTTON_SIZE + vpx(30),
      },
    ]}
    pointerEvents="box-none">
    <FloatingTabBG color={COLORS.fullWhite} style={styles.tabBgSvg} />
    <View
      style={[
        styles.floatingCTAView,
        {
          height: FLOATING_BUTTON_SIZE,
        },
      ]}>
      <AppCTA onPress={props.onPress} style={styles.floatingCTA}>
        <RNText style={styles.floatingCTAText}>Book</RNText>
      </AppCTA>
    </View>
  </View>
);

export default FloatingTabCTA;

import React, {useState} from 'react';
import _ from 'lodash';
import {View} from 'react-native';
import RNText from '../RNText';
import {AppBackIcon} from '../RNIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './styles';
import {goBack} from '@service/Navigation';
import AppCTA from '../AppCTA';
import LinearGradient from 'react-native-linear-gradient';

interface AppHeaderProps {
  LeftComponent?: any;
  RightComponent?: any;
  title?: string;
  containerStyles?: any;
  titleStyles?: any;
  safePaddingEnabled: boolean;
  multipleCTAModeEnabled?: boolean;
  transparentBackgroundEnabled: boolean;
  floatingEnabled?: boolean;
  gradientEnabled?: boolean;
  gradientStyles?: any;
  gradientColors?: string[];
}

const AppHeader = (props: AppHeaderProps) => {
  const insets = useSafeAreaInsets();
  const {
    LeftComponent,
    RightComponent,
    title,
    safePaddingEnabled = false, // For Extra Paddings Around Header - Horizontally
    transparentBackgroundEnabled = false, // For Making Header Color Transparent
    floatingEnabled = false, // For Making Header -> Absolute
    multipleCTAModeEnabled = false, // For Adjusting Info to Left on Multiple CTAs
    gradientEnabled = false, // For Adding Gradient Support
    containerStyles = {},
    titleStyles = {},
    gradientStyles = {},
    gradientColors = [],
  } = props;
  const [headerViewLayout, setHeaderViewLayout] = useState({
    height: 0,
    width: 0,
  });
  const [controlsViewLayout, setControlsViewLayout] = useState({
    height: 0,
    width: 0,
  });

  const handleControlsViewLayout = (layout: any) => {
    setControlsViewLayout(layout);
  };

  const handlesHeaderViewLayout = (layout: any) => {
    setHeaderViewLayout(layout);
  };

  const onLayout = (name: string, event: any) => {
    const {
      nativeEvent: {layout},
    } = event;
    switch (name) {
      case 'HEADER_VIEW':
        handlesHeaderViewLayout(layout);
        break;
      case 'CONTROLS_VIEW':
        handleControlsViewLayout(layout);
        break;

      default:
        break;
    }
  };

  return (
    <View
      onLayout={e => {
        onLayout('HEADER_VIEW', e);
      }}
      style={[
        styles.headerView(
          transparentBackgroundEnabled,
          safePaddingEnabled,
          floatingEnabled,
        ),
        {paddingTop: insets.top},
        containerStyles,
      ]}>
      <View
        onLayout={e => {
          onLayout('CONTROLS_VIEW', e);
        }}>
        {/* Left Component */}
        {!_.isEmpty(LeftComponent) ? (
          LeftComponent
        ) : (
          <AppCTA onPress={goBack}>
            <AppBackIcon />
          </AppCTA>
        )}
      </View>

      <View style={styles.headerCenteredInfoView(multipleCTAModeEnabled)}>
        {/* Center Component */}
        {!_.isEmpty(title) && (
          <RNText style={[styles.headerTitle, titleStyles]}>{title}</RNText>
        )}
      </View>

      <View style={{minWidth: controlsViewLayout.width}}>
        {/* Right Component */}
        {!_.isEmpty(RightComponent) ? RightComponent : <View />}
      </View>
      {!!gradientEnabled && !_.isEmpty(gradientColors) && (
        <LinearGradient
          colors={gradientColors}
          style={[
            styles.gradientView,
            {
              height: headerViewLayout.height,
              width: headerViewLayout.width,
            },
            gradientStyles,
          ]}
        />
      )}
    </View>
  );
};

export default AppHeader;

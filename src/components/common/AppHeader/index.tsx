import React, {useState} from 'react';
import {View} from 'react-native';
import RNText from '../RNText';
import _ from 'lodash';
import {AppBackIcon} from '../RNIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './styles';
import AppCTA from '../AppCTA';
import {goBack} from '../../../service/Navigation';

interface AppHeaderProps {
  LeftComponent?: any;
  RightComponent?: any;
  title?: string;
  containerStyles?: any;
}

const AppHeader = (props: AppHeaderProps) => {
  const insets = useSafeAreaInsets();
  const {LeftComponent, RightComponent, title, containerStyles = {}} = props;
  const [controlsViewLayout, setControlsViewLayout] = useState({
    height: 0,
    width: 0,
  });

  const handleControlsViewLayout = (layout: any) => {
    setControlsViewLayout(layout);
  };

  const onLayout = (name: string, event: any) => {
    const {
      nativeEvent: {layout},
    } = event;
    switch (name) {
      case 'CONTROLS_VIEW':
        handleControlsViewLayout(layout);
        break;

      default:
        break;
    }
  };

  return (
    <View
      style={[styles.headerView, {paddingTop: insets.top}, containerStyles]}>
      <View
        onLayout={e => {
          onLayout('CONTROLS_VIEW', e);
        }}
        style={styles.headerLeftInfoView}>
        {/* Left Component */}
        {!_.isEmpty(LeftComponent) ? (
          LeftComponent
        ) : (
          <AppCTA onPress={goBack}>
            <AppBackIcon />
          </AppCTA>
        )}
      </View>

      <View style={styles.headerCenteredInfoView}>
        {/* Center Component */}
        {!_.isEmpty(title) && (
          <RNText style={styles.headerTitle}>{title}</RNText>
        )}
      </View>

      <View style={[styles.headerRightInfoView, {...controlsViewLayout}]}>
        {/* Right Component */}
        {!_.isEmpty(RightComponent) ? RightComponent : <View />}
      </View>
    </View>
  );
};

export default AppHeader;

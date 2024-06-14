import React from 'react';
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
  showDivider?: boolean;
}

const AppHeader = (props: AppHeaderProps) => {
  const insets = useSafeAreaInsets();
  const {LeftComponent, RightComponent, title, showDivider} = props;
  return (
    <View>
      <View style={[styles.headerView, {paddingTop: insets.top}]}>
        <View style={styles.headerLeftInfoView}>
          {!_.isEmpty(LeftComponent) ? (
            LeftComponent
          ) : (
            <AppCTA onPress={goBack}>
              <AppBackIcon />
            </AppCTA>
          )}
          {!_.isEmpty(title) && (
            <RNText style={styles.headerTitle}>{title}</RNText>
          )}
        </View>

        {!_.isEmpty(RightComponent) ? RightComponent : <View />}
      </View>
      {showDivider && <View style={styles.headerDivider} />}
    </View>
  );
};

export default AppHeader;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {styles} from './styles';
import {APP_TABS_MAP} from '../../../constants/Navigation';
import HomeStack from '../../stacks/Home';
import {tabOptions} from '../../../utilities/TabUtils';
import {COLORS} from '../../../constants/Colors';
import SearchStack from '../../stacks/Search';
import ProfileStack from '../../stacks/Profile';

const {Navigator, Screen} = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Navigator
      initialRouteName={APP_TABS_MAP.HOME_TAB}
      backBehavior={'initialRoute'}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.oceanBlue,
        tabBarInactiveTintColor: COLORS.lightGray,
      }}>
      <Screen
        name={APP_TABS_MAP.HOME_TAB}
        component={HomeStack}
        options={tabOptions(APP_TABS_MAP.HOME_TAB)}
      />
      <Screen
        name={APP_TABS_MAP.SEARCH_TAB}
        component={SearchStack}
        options={tabOptions(APP_TABS_MAP.SEARCH_TAB)}
      />
      <Screen
        name={APP_TABS_MAP.PROFILE_TAB}
        component={ProfileStack}
        options={tabOptions(APP_TABS_MAP.PROFILE_TAB)}
      />
    </Navigator>
  );
};

export default MainTab;

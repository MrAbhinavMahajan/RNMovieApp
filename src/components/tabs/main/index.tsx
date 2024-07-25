import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {styles} from './styles';
import {APP_TABS_MAP} from '@constants/Navigation';
import {tabOptions} from '@utilities/Tabs';
import {COLORS} from '@constants/Colors';
import HomeStack from '@components/stacks/Home';
import SearchStack from '@components/stacks/Search';
import ExploreStack from '../../stacks/Explore';
import ProfileStack from '@components/stacks/Profile';

const {Navigator, Screen} = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Navigator
      initialRouteName={APP_TABS_MAP.HOME_TAB}
      backBehavior={'initialRoute'}
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.oceanBlue,
        tabBarInactiveTintColor: COLORS.oliveBlack,
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: false,
        headerShown: false,
        tabBarShowLabel: false,
        lazy: false, // * To Lazy Load The Tabs (Preloading)
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
        name={APP_TABS_MAP.EXPLORE_TAB}
        component={ExploreStack}
        options={tabOptions(APP_TABS_MAP.EXPLORE_TAB)}
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

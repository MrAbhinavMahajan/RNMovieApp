import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {styles} from './styles';
import {kTABS} from '../../../constants/Navigation';
import HomeStack from '../../stacks/Home';
import {tabOptions} from '../../../utilities/TabUtils';
import {COLORS} from '../../../constants/Colors';
import SearchStack from '../../stacks/Search';
import ProfileStack from '../../stacks/Profile';

const {Navigator, Screen} = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Navigator
      initialRouteName={kTABS.HOME_TAB}
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
        name={kTABS.HOME_TAB}
        component={HomeStack}
        options={tabOptions(kTABS.HOME_TAB)}
      />
      <Screen
        name={kTABS.SEARCH_TAB}
        component={SearchStack}
        options={tabOptions(kTABS.SEARCH_TAB)}
      />
      <Screen
        name={kTABS.PROFILE_TAB}
        component={ProfileStack}
        options={tabOptions(kTABS.PROFILE_TAB)}
      />
    </Navigator>
  );
};

export default MainTab;

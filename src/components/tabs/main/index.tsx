import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {styles} from './styles';
import {kTABS} from '../../../constants/Navigation';
import HomeStack from '../../stacks/Home';
import WatchlistStack from '../../stacks/Watchlist';
import {tabOptions} from '../../../utilities/TabUtils';

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
      }}>
      <Screen
        name={kTABS.HOME_TAB}
        component={HomeStack}
        options={tabOptions(kTABS.HOME_TAB)}
      />
      <Screen
        name={kTABS.WATCHLIST_TAB}
        component={WatchlistStack}
        options={tabOptions(kTABS.WATCHLIST_TAB)}
      />
    </Navigator>
  );
};

export default MainTab;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {styles} from './styles';
import {kSTACKS} from '../../../constants/Navigation';
import HomeStack from '../../stacks/Home';
import WatchlistStack from '../../stacks/Watchlist';

const {Navigator, Screen} = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Navigator
      initialRouteName={kSTACKS.HOME_STACK}
      backBehavior={'initialRoute'}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: false,
        headerShown: false,
      }}>
      <Screen name={kSTACKS.HOME_STACK} component={HomeStack} />
      <Screen name={kSTACKS.WATCHLIST_STACK} component={WatchlistStack} />
    </Navigator>
  );
};

export default MainTab;

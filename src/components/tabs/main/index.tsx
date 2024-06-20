import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {styles} from './styles';
import {kTABS} from '../../../constants/Navigation';
import HomeStack from '../../stacks/Home';
import WatchlistStack from '../../stacks/Watchlist';
import {tabOptions} from '../../../utilities/TabUtils';
import FavoriteStack from '../../stacks/Favorite';
import {COLORS} from '../../../constants/Colors';
import SearchStack from '../../stacks/Search';

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
        name={kTABS.FAVORITE_TAB}
        component={FavoriteStack}
        options={tabOptions(kTABS.FAVORITE_TAB)}
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

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {kROUTES} from '../../constants/Navigation';
import WatchlistScreen from '../pages/watchlist';

const {Navigator, Screen} = createNativeStackNavigator();

const WatchlistStack = () => (
  <Navigator
    initialRouteName={kROUTES.WATCHLIST_SCREEN}
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}>
    <Screen name={kROUTES.WATCHLIST_SCREEN} component={WatchlistScreen} />
  </Navigator>
);

export default WatchlistStack;

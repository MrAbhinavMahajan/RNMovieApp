import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_PAGES_MAP} from '../../constants/Navigation';
import HomeScreen from '../pages/home';

const {Navigator, Screen} = createNativeStackNavigator();

const HomeStack = () => (
  <Navigator
    initialRouteName={APP_PAGES_MAP.HOME_SCREEN}
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}>
    <Screen name={APP_PAGES_MAP.HOME_SCREEN} component={HomeScreen} />
  </Navigator>
);

export default HomeStack;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_PAGES_MAP} from '@constants/Navigation';
import SplashScreen from '@components/pages/splash';

const {Navigator, Screen} = createNativeStackNavigator();

const LaunchStack = () => (
  <Navigator
    initialRouteName={APP_PAGES_MAP.SPLASH_SCREEN}
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}>
    <Screen name={APP_PAGES_MAP.SPLASH_SCREEN} component={SplashScreen} />
  </Navigator>
);

export default LaunchStack;

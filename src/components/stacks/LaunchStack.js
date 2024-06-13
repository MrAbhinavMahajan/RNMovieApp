import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {kROUTES} from '../../constants/Navigation';
import SplashScreen from '../pages/splash';

const {Navigator, Screen} = createNativeStackNavigator();

const LaunchStack = () => (
  <Navigator
    initialRouteName={kROUTES.SPLASH_SCREEN}
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}>
    <Screen name={kROUTES.SPLASH_SCREEN} component={SplashScreen} />
  </Navigator>
);

export default LaunchStack;

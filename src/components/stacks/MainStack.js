import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {kROUTES} from '../../constants/Navigation';
import HomeScreen from '../pages/home';

const {Navigator, Screen} = createNativeStackNavigator();

const MainStack = () => (
  <Navigator
    initialRouteName={kROUTES.HOME_SCREEN}
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}>
    <Screen name={kROUTES.HOME_SCREEN} component={HomeScreen} />
  </Navigator>
);

export default MainStack;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../../service/Navigation';
import LaunchStack from './LaunchStack';
import MainStack from './MainStack';
import {kSTACKS} from '../../constants/Navigation';
const {Navigator, Screen} = createNativeStackNavigator();

// * NavigationContainer is a component which manages our navigation tree and contains the navigation state
// * createNativeStackNavigator is a function that returns an object containing 2 properties: Screen and Navigator. Both of them are React components used for configuring the navigator

const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator
        initialRouteName={kSTACKS.LAUNCH_STACK}
        screenOptions={{
          gestureEnabled: false,
          animation: 'fade_from_bottom',
          orientation: 'portrait',
          headerShown: false,
        }}>
        <Screen name={kSTACKS.LAUNCH_STACK} component={LaunchStack} />
        <Screen name={kSTACKS.MAIN_STACK} component={MainStack} />
      </Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

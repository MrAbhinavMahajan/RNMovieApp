import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_PAGES_MAP} from '@constants/Navigation';
import SignInScreen from '@components/pages/signIn';

const {Navigator, Screen} = createNativeStackNavigator();

const AuthStack = () => (
  <Navigator
    initialRouteName={APP_PAGES_MAP.SIGN_IN_SCREEN}
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}>
    <Screen name={APP_PAGES_MAP.SIGN_IN_SCREEN} component={SignInScreen} />
  </Navigator>
);

export default AuthStack;

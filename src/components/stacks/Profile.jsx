import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_PAGES_MAP} from '../../constants/Navigation';
import ProfileScreen from '../pages/profile';

const {Navigator, Screen} = createNativeStackNavigator();

const ProfileStack = () => (
  <Navigator
    initialRouteName={APP_PAGES_MAP.PROFILE_SCREEN}
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}>
    <Screen name={APP_PAGES_MAP.PROFILE_SCREEN} component={ProfileScreen} />
  </Navigator>
);

export default ProfileStack;

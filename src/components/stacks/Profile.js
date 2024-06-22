import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {kROUTES} from '../../constants/Navigation';
import ProfileScreen from '../pages/profile';

const {Navigator, Screen} = createNativeStackNavigator();

const ProfileStack = () => (
  <Navigator
    initialRouteName={kROUTES.PROFILE_SCREEN}
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}>
    <Screen name={kROUTES.PROFILE_SCREEN} component={ProfileScreen} />
  </Navigator>
);

export default ProfileStack;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_PAGES_MAP} from '@constants/Navigation';
import MovieExploreScreen from '../pages/movieExplore';

const {Navigator, Screen} = createNativeStackNavigator();

const ExploreStack = () => {
  return (
    <Navigator
      initialRouteName={APP_PAGES_MAP.EXPLORE_SCREEN}
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Screen
        name={APP_PAGES_MAP.EXPLORE_SCREEN}
        component={MovieExploreScreen}
      />
    </Navigator>
  );
};

export default ExploreStack;

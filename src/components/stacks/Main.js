import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../../service/Navigation';
import LaunchStack from './Launch';
import {APP_PAGES_MAP, APP_STACKS_MAP} from '../../constants/Navigation';
import MainTab from '../tabs/main';
import MovieDetailsScreen from '../pages/movieDetails';
import ViewAllMoviesScreen from '../pages/viewAllMovies';
const {Navigator, Screen} = createNativeStackNavigator();

// * NavigationContainer is a component which manages our navigation tree and contains the navigation state
// * createNativeStackNavigator is a function that returns an object containing 2 properties: Screen and Navigator. Both of them are React components used for configuring the navigator

const MainStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator
        initialRouteName={APP_STACKS_MAP.LAUNCH_STACK}
        screenOptions={{
          gestureEnabled: false,
          animation: 'fade_from_bottom',
          orientation: 'portrait',
          headerShown: false,
        }}>
        {/* Tab Bar */}
        <Screen name={APP_STACKS_MAP.LAUNCH_STACK} component={LaunchStack} />
        <Screen name={APP_STACKS_MAP.MAIN_TAB} component={MainTab} />

        {/* Non-Tab Bar Screens */}
        <Screen
          name={APP_PAGES_MAP.MOVIE_DETAILS_SCREEN}
          component={MovieDetailsScreen}
        />
        <Screen
          name={APP_PAGES_MAP.VIEW_ALL_MOVIES_SCREEN}
          component={ViewAllMoviesScreen}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

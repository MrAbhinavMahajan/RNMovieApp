import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '@service/Navigation';
import {APP_PAGES_MAP, APP_STACKS_MAP} from '@constants/Navigation';
import LaunchStack from './Launch';
import AuthStack from './Auth';
import MainTab from '../tabs/main';
import MovieDetailsScreen from '@components/pages/movieDetails';
import MovieViewAllScreen from '@components/pages/movieViewAll';
import ProfileViewAllScreen from '@components/pages/profileViewAll';
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
          orientation: 'portrait',
          headerShown: false,
        }}>
        <Screen name={APP_STACKS_MAP.LAUNCH_STACK} component={LaunchStack} />
        <Screen
          name={APP_STACKS_MAP.AUTH_STACK}
          component={AuthStack}
          options={{animation: 'slide_from_bottom'}}
        />

        {/* Tab Bar Screens*/}
        <Screen
          name={APP_STACKS_MAP.MAIN_TAB}
          component={MainTab}
          options={{animation: 'fade'}}
        />

        {/* Non-Tab Bar Screens */}
        <Screen
          name={APP_PAGES_MAP.MOVIE_DETAILS_SCREEN}
          component={MovieDetailsScreen}
        />
        <Screen
          name={APP_PAGES_MAP.MOVIE_VIEW_ALL_SCREEN}
          component={MovieViewAllScreen}
        />
        <Screen
          name={APP_PAGES_MAP.PROFILE_VIEW_ALL_SCREEN}
          component={ProfileViewAllScreen}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

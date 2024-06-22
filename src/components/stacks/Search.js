import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_PAGES_MAP} from '../../constants/Navigation';
import MovieSearchScreen from '../pages/movieSearch';

const {Navigator, Screen} = createNativeStackNavigator();

const SearchStack = () => (
  <Navigator
    initialRouteName={APP_PAGES_MAP.SEARCH_SCREEN}
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}>
    <Screen name={APP_PAGES_MAP.SEARCH_SCREEN} component={MovieSearchScreen} />
  </Navigator>
);

export default SearchStack;

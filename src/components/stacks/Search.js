import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {kROUTES} from '../../constants/Navigation';
import MovieSearchScreen from '../pages/movieSearch';

const {Navigator, Screen} = createNativeStackNavigator();

const SearchStack = () => (
  <Navigator
    initialRouteName={kROUTES.SEARCH_SCREEN}
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}>
    <Screen name={kROUTES.SEARCH_SCREEN} component={MovieSearchScreen} />
  </Navigator>
);

export default SearchStack;

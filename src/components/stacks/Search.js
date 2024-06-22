import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_PAGES_MAP} from '../../constants/Navigation';
import MovieSearchScreen from '../pages/movieSearch';
import _ from 'lodash';

const {Navigator, Screen} = createNativeStackNavigator();

const SearchStack = () => (
  <Navigator
    initialRouteName={APP_PAGES_MAP.SEARCH_SCREEN}
    screenOptions={{
      gestureEnabled: false,
    }}>
    <Screen
      name={APP_PAGES_MAP.SEARCH_SCREEN}
      component={MovieSearchScreen}
      options={({navigation}) => ({
        headerTitle: 'Movies',
        headerBlurEffect: 'prominent',
        headerLargeTitle: true,
        headerTransparent: true,
        headerSearchBarOptions: {
          placeholder: 'Search Movie',
          hideWhenScrolling: false,
          autoCapitalize: 'none',
          onChangeText: ({nativeEvent: {text: searchedText}}) => {
            navigation.setParams({
              queryParams: {searchedText},
            });
          },
          onCancelButtonPress: () => {
            navigation.setParams({
              queryParams: {searchedText: ''},
            });
          },
        },
      })}
    />
  </Navigator>
);

export default SearchStack;

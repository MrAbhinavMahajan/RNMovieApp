import React from 'react';
import _ from 'lodash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_PAGES_MAP} from '@constants/Navigation';
import MovieSearchScreen from '@components/pages/movieSearch';
import {STD_SCREEN_COLOR} from '@constants/Styles';

const {Navigator, Screen} = createNativeStackNavigator();

const SearchStack = () => {
  const debouncedSearch = _.debounce(function (navigation, searchedText) {
    navigation.setParams({
      queryParams: {searchedText},
    });
  }, 500);

  return (
    <Navigator
      initialRouteName={APP_PAGES_MAP.SEARCH_SCREEN}
      screenOptions={{
        gestureEnabled: false,
      }}>
      <Screen
        name={APP_PAGES_MAP.SEARCH_SCREEN}
        component={MovieSearchScreen}
        options={({navigation}) => ({
          headerTitle: 'Popular Movies',
          headerBlurEffect: 'prominent',
          headerLargeTitle: true,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: STD_SCREEN_COLOR,
          },
          headerSearchBarOptions: {
            placeholder: 'Search Movie',
            hideWhenScrolling: false,
            autoCapitalize: 'none',
            onChangeText: ({nativeEvent: {text: searchedText}}) => {
              debouncedSearch(navigation, searchedText);
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
};

export default SearchStack;

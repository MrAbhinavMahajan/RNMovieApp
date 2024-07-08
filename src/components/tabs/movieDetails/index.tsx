import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MovieReviewsScreen from '@components/pages/movieReviews';
import MovieExploreScreen from '@components/pages/movieExplore';
import {APP_PAGES_MAP} from '@constants/Navigation';
import {STYLES} from '@constants/Styles';
import {COLORS} from '@constants/Colors';
import {styles} from './styles';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const MovieDetailsTab = () => {
  return (
    <Navigator
      style={STYLES.flexGrow}
      initialRouteName={APP_PAGES_MAP.MOVIE_REVIEWS_SCREEN}
      screenOptions={{
        tabBarLabelStyle: styles.tabBarTitle,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIndicatorStyle: styles.tabBarIndicator,
        tabBarActiveTintColor: COLORS.oceanBlue,
        tabBarInactiveTintColor: COLORS.oliveBlack,
        tabBarAllowFontScaling: false,
      }}>
      <Screen
        name={'Reviews'}
        key={APP_PAGES_MAP.MOVIE_REVIEWS_SCREEN}
        component={MovieReviewsScreen}
      />
      <Screen
        name={'Explore'}
        key={APP_PAGES_MAP.MOVIE_EXPLORE_SCREEN}
        component={MovieExploreScreen}
      />
    </Navigator>
  );
};

export default MovieDetailsTab;

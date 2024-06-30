import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {APP_PAGES_MAP} from '../../../constants/Navigation';
import MovieReviewsScreen from '../../pages/movieReviews';
import MovieExploreScreen from '../../pages/movieExplore';
import {STYLES} from '../../../constants/Styles';
import {styles} from './styles';
import {COLORS} from '../../../constants/Colors';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const MovieDetailsTab = () => {
  return (
    <Navigator
      style={STYLES.flexGrow}
      initialRouteName={APP_PAGES_MAP.MOVIE_EXPLORE_SCREEN}
      screenOptions={{
        tabBarLabelStyle: styles.tabBarTitle,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIndicatorStyle: styles.tabBarIndicator,
        tabBarActiveTintColor: COLORS.oceanBlue,
        tabBarInactiveTintColor: COLORS.oliveBlack,
        tabBarAllowFontScaling: false,
      }}>
      <Screen
        name={'Explore'}
        key={APP_PAGES_MAP.MOVIE_EXPLORE_SCREEN}
        component={MovieExploreScreen}
      />
      <Screen
        name={'Reviews'}
        key={APP_PAGES_MAP.MOVIE_REVIEWS_SCREEN}
        component={MovieReviewsScreen}
      />
    </Navigator>
  );
};

export default MovieDetailsTab;

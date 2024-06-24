import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {APP_PAGES_MAP} from '../../../constants/Navigation';
import MovieAboutScreen from '../../pages/movieAbout';
import MovieReviewsScreen from '../../pages/movieReviews';
import MovieSimilarScreen from '../../pages/movieSimilar';
import {STYLES} from '../../../constants/Styles';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const MovieDetailsTab = () => {
  return (
    <Navigator style={STYLES.flexGrow}>
      <Screen
        name={'About'}
        key={APP_PAGES_MAP.MOVIE_ABOUT_SCREEN}
        component={MovieAboutScreen}
      />
      <Screen
        name={'Reviews'}
        key={APP_PAGES_MAP.MOVIE_REVIEWS_SCREEN}
        component={MovieReviewsScreen}
      />
      <Screen
        name={'Similar'}
        key={APP_PAGES_MAP.MOVIE_SIMILAR_SCREEN}
        component={MovieSimilarScreen}
      />
    </Navigator>
  );
};

export default MovieDetailsTab;

import React from 'react';
import Animated from 'react-native-reanimated';
import * as NavigationService from '@service/Navigation';
import MoviePosterWidget from '@components/widgets/MoviePoster';
import {APP_PAGES_MAP} from '@constants/Navigation';
import {MoviePosterItem} from '@constants/AppInterfaces';
import {styles} from './styles';

const MovieCard = ({item, index}: {item: MoviePosterItem; index: number}) => {
  const {title, id} = item || {};
  const onCTA = () => {
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
      queryParams: {screenTitle: title, movieId: id},
    });
  };
  return (
    <Animated.View style={styles.container}>
      <MoviePosterWidget
        item={item}
        index={index}
        containerStyles={styles.moviePoster}
        action={onCTA}
      />
    </Animated.View>
  );
};

export default MovieCard;

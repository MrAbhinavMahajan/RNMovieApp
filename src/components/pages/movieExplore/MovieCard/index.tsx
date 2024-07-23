import React from 'react';
import {View} from 'react-native';
import * as NavigationService from '@service/Navigation';
import {APP_PAGES_MAP} from '@constants/Navigation';
import {MovieItem} from '@constants/AppInterfaces';
import {styles} from './styles';
import MoviePosterWidget from '@components/widgets/MoviePoster';
import MovieDetails from '../MovieDetails';

const MovieCard = ({
  item,
  index,
  size,
}: {
  item: MovieItem;
  index: number;
  size: number;
}) => {
  const {title, id} = item || {};
  const onCTA = () => {
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
      queryParams: {screenTitle: title, movieId: id},
    });
  };
  return (
    <View style={styles.container}>
      <MoviePosterWidget
        item={item}
        index={index}
        containerStyles={styles.moviePoster}
        action={onCTA}
      />
      <MovieDetails item={item} index={index} size={size} />
    </View>
  );
};

export default MovieCard;

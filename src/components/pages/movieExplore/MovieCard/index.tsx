import React from 'react';
import {View} from 'react-native';
import * as NavigationService from '@service/Navigation';
import {APP_PAGES_MAP} from '@constants/Navigation';
import {MovieItem} from '@constants/AppInterfaces';
import {styles} from './styles';
import MoviePosterWidget from '@components/widgets/MoviePoster';
import {onPageClickEvent} from '~/src/analytics';

const MovieCard = ({item, index}: {item: MovieItem; index: number}) => {
  const {title, id} = item || {};
  const onCTA = () => {
    onPageClickEvent({
      pageID: APP_PAGES_MAP.EXPLORE_SCREEN,
      name: 'MOVIE POSTER CTA',
      extraData: {
        ...item,
      },
    });
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
      queryParams: {movieName: title, movieId: id},
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
    </View>
  );
};

export default MovieCard;

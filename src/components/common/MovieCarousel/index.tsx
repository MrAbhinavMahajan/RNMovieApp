import React, {useState} from 'react';
import {View} from 'react-native';
import * as NavigationService from '@service/Navigation';
import {MovieItem} from '@constants/AppInterfaces';
import {APP_PAGES_MAP} from '~/src/constants/Navigation';
import {styles} from './styles';
import PosterCard from './PosterCard';
import BackdropCard from './BackdropCard';

type MovieCarousel = {
  movies: MovieItem[];
};

const MovieCarousel = ({movies}: MovieCarousel) => {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log('Movies:::', movies[activeIndex]);

  const onCTA = () => {
    const {title, id} = movies[activeIndex] || {};
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
      queryParams: {screenTitle: title, movieId: id},
    });
  };

  return (
    <View style={styles.container}>
      <BackdropCard
        item={movies[activeIndex]}
        index={activeIndex}
        action={onCTA}
      />
      <PosterCard
        item={movies[activeIndex]}
        index={activeIndex}
        action={onCTA}
      />
    </View>
  );
};

export default MovieCarousel;

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';
import RNImage from '../../../common/RNImage';
import {IMAGE_BASEURL} from '../../../../constants/Main';
import * as NavigationService from '../../../../service/Navigation';
import {APP_PAGES_MAP} from '../../../../constants/Navigation';

interface MovieItemProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const MovieItem = ({item, index}: {item: MovieItemProps; index: number}) => {
  const {poster_path, backdrop_path, title} = item;
  const imageURL = `${IMAGE_BASEURL}${poster_path}`;

  return (
    <TouchableOpacity
      key={index}
      style={styles.movieCardView}
      onPress={() => {
        NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
          queryParams: {screenTitle: title},
        });
      }}>
      <RNImage imageURL={imageURL} imageStyles={styles.imageStyles} />
    </TouchableOpacity>
  );
};

export default MovieItem;

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';
import RNImage from '../../common/RNImage';
import {IMAGE_BASEURL} from '../../../constants/Main';
import * as NavigationService from '../../../service/Navigation';
import {APP_PAGES_MAP} from '../../../constants/Navigation';
import {ShadowedView} from 'react-native-fast-shadow';

export interface MoviePosterItem {
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

const MoviePosterWidget = ({
  item,
  index,
  containerStyles = {},
}: {
  item: MoviePosterItem;
  index: number;
  containerStyles: any;
}) => {
  const {poster_path, title, id} = item || {};
  const imageURL = `${IMAGE_BASEURL}${poster_path}`;

  return (
    <ShadowedView style={styles.shadowEffect}>
      <TouchableOpacity
        key={index}
        style={[styles.movieCardView, containerStyles]}
        onPress={() => {
          NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
            queryParams: {screenTitle: title, movieId: id},
          });
        }}>
        <RNImage imageURL={imageURL} />
      </TouchableOpacity>
    </ShadowedView>
  );
};

export default MoviePosterWidget;

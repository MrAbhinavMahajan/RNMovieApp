import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';
import RNImage from '../../common/RNImage';
import {IMAGE_BASEURL} from '../../../constants/Main';

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
  action,
}: {
  item: MoviePosterItem;
  index: number;
  containerStyles: any;
  action?: () => void;
}) => {
  const {poster_path} = item || {};
  const imageURL = `${IMAGE_BASEURL}${poster_path}`;
  const fallbackCharacter = item?.title ? item?.title[0] : '';

  return (
    <TouchableOpacity
      key={index}
      style={[styles.movieCardView, containerStyles]}
      disabled={!action}
      onPress={action}>
      <RNImage imageURL={imageURL} fallbackCharacter={fallbackCharacter} />
    </TouchableOpacity>
  );
};

export default MoviePosterWidget;

import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import RNImage from '../../../common/RNImage';
import {IMAGE_BASEURL} from '../../../../constants/Main';

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
  const {poster_path, backdrop_path} = item;
  const imageURL = `${IMAGE_BASEURL}${poster_path}`;
  const backdropImageURL = `${IMAGE_BASEURL}${backdrop_path}`;

  return (
    <View key={index} style={styles.movieCardView}>
      <RNImage
        imageURL={imageURL || backdropImageURL}
        imageStyles={styles.imageStyles}
      />
    </View>
  );
};

export default MovieItem;

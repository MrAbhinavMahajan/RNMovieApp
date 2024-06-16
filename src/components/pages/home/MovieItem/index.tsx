import React from 'react';
import RNText from '../../../common/RNText';
import {View} from 'react-native';
import {styles} from './styles';

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
  const {title} = item;
  return (
    <View style={styles.movieCardView}>
      <RNText style={styles.movieCardTitle}>{title}</RNText>
    </View>
  );
};

export default MovieItem;

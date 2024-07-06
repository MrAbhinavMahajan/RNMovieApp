import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';
import RNImage from '../../common/RNImage';
import {IMAGE_BASEURL} from '../../../constants/Main';

export interface MoviePosterItem {
  poster_path: string;
  title: string;
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
  const {poster_path, title = ''} = item || {};
  const imageURL = `${IMAGE_BASEURL}${poster_path}`;
  const fallbackCharacter = title ? title[0] : '';

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

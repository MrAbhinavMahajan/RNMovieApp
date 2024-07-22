import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';
import RNImage from '@components/common/RNImage';
import {MoviePosterItem} from '@constants/AppInterfaces';
import {getImageURL} from '~/src/utilities/App';

interface MoviePosterWidgetProps {
  item: MoviePosterItem;
  index: number;
  containerStyles: any;
  action?: () => void;
}

const MoviePosterWidget = ({
  item,
  index,
  containerStyles = {},
  action,
}: MoviePosterWidgetProps) => {
  const {poster_path, title = ''} = item || {};
  const imageURL = getImageURL(poster_path ?? '');
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

import React from 'react';
import {Pressable} from 'react-native';
import {styles} from './styles';
import RNImage from '@components/common/RNImage';
import {MoviePosterItem} from '@constants/AppInterfaces';
import {getImageURL} from '@utilities/App';
import {FastImageProps} from 'react-native-fast-image';

type MoviePosterWidgetProps = {
  item: MoviePosterItem;
  index: number;
  isBackdrop?: boolean;
  containerStyles: any;
  imageStyles?: any;
  action?: () => void;
} & FastImageProps;

const MoviePosterWidget = ({
  item,
  index,
  containerStyles = {},
  imageStyles = {},
  action,
  isBackdrop,
  ...imageData
}: MoviePosterWidgetProps) => {
  const {poster_path, backdrop_path, title = ''} = item || {};
  const imageURL = getImageURL(isBackdrop ? backdrop_path : poster_path ?? '');
  const fallbackCharacter = title ? title[0] : '';

  return (
    <Pressable
      key={index}
      style={[styles.movieCardView, containerStyles]}
      disabled={!action}
      onPress={action}>
      <RNImage
        imageURL={imageURL}
        fallbackCharacter={fallbackCharacter}
        imageStyles={imageStyles}
        {...imageData}
      />
    </Pressable>
  );
};

export default MoviePosterWidget;

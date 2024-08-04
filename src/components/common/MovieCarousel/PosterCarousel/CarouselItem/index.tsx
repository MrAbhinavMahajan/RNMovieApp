import React from 'react';
import {MovieItem} from '@constants/AppInterfaces';
import {getImageURL} from '@utilities/App';
import {styles} from './styles';
import RNImage from '@components/common/RNImage';
import AppCTA from '@components/common/AppCTA';

type CarouselItem = {
  item: MovieItem;
  action: () => void;
};

const CarouselItem = ({item, action}: CarouselItem) => {
  const {title, backdrop_path} = item || {};
  const fallbackCharacter = title ? title[0] : '';
  const imageURL = getImageURL(backdrop_path);
  return (
    <AppCTA onPress={action}>
      <RNImage
        imageURL={imageURL}
        fallbackCharacter={fallbackCharacter}
        imageViewStyles={styles.imageView}
      />
    </AppCTA>
  );
};

export default CarouselItem;

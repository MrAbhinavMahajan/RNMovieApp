import React from 'react';
import {MovieItem, MovieCarouselTypes} from '@constants/AppInterfaces';
import BannerCarousel from './BannerCarousel';
import PosterCarousel from './PosterCarousel';

type MovieCarousel = {
  carouselType: MovieCarouselTypes;
  data: MovieItem[];
  itemAction: () => void;
};

const MovieCarousel = ({carouselType, ...restProps}: MovieCarousel) => {
  switch (carouselType) {
    case MovieCarouselTypes.BANNER:
      return <BannerCarousel {...restProps} />;
    case MovieCarouselTypes.POSTER:
      return <PosterCarousel {...restProps} />;
    default:
      return <></>;
  }
};

export default MovieCarousel;

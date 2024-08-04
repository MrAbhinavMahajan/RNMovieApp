import React from 'react';
import {
  MovieCarouselTypes,
  MovieCarouselParams,
} from '@constants/AppInterfaces';
import BannerCarousel from './BannerCarousel';
import PosterCarousel from './PosterCarousel';

type MovieCarousel = {
  carouselType: MovieCarouselTypes;
} & MovieCarouselParams;

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

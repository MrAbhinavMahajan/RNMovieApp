import React from 'react';
import useMovieStore from '@store/useMovieStore';
import RNText from '../RNText';
import _ from 'lodash';

type MovieGenres = {
  genreIds: number[];
  genreTextStyles: any;
  separator?: string;
};

const MovieGenres = ({
  genreIds = [],
  genreTextStyles = {},
  separator = ' | ',
}: MovieGenres) => {
  const genres = useMovieStore(state => state.genres);
  const genresById = (genreId: number) => {
    return genres.find(el => el.id === genreId)?.name;
  };

  if (_.isEmpty(genreIds)) {
    return <></>;
  }

  return (
    <RNText style={genreTextStyles}>
      {genreIds.map(genreId => genresById(genreId)).join(separator)}
    </RNText>
  );
};

export default MovieGenres;

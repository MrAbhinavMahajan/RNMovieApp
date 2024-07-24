/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchMovieGenres} from '~/src/apis/Main';
import {APP_QUERY_MAP} from '~/src/constants/Api';
import {logError} from '~/src/analytics';

const MovieGenres = () => {
  const {data, isFetched, error, isError} = useQuery({
    queryKey: [APP_QUERY_MAP.MOVIE_GENRES],
    queryFn: ({signal}) => fetchMovieGenres(signal),
  });

  useEffect(() => {
    if (isError) {
      logError(error?.message);
    } else if (isFetched) {
    }
  }, [isFetched, isError]);

  return <></>;
};

export default MovieGenres;

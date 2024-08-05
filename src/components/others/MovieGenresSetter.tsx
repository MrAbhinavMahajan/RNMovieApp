/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import useMovieStore from '~/src/store/useMovieStore';
import {fetchMovieGenres} from '~/src/apis/Main';
import {APP_QUERY_MAP} from '~/src/constants/Api';
import {logError} from '~/src/analytics';

const MovieGenresSetter = () => {
  const setGenres = useMovieStore(state => state.setGenres);
  const {data, isFetched, error, isError} = useQuery({
    queryKey: [APP_QUERY_MAP.MOVIE_GENRES],
    queryFn: ({signal}) => fetchMovieGenres(signal),
  });

  useEffect(() => {
    if (isError) {
      logError(error?.message);
    }
    if (isFetched && data?.genres) {
      setGenres(data?.genres);
    }
  }, [isFetched, isError]);

  return <></>;
};

export default MovieGenresSetter;

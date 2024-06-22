import {useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {fetchRecommendedMovies} from '../../../apis/Main';
import {NativeAppEventEmitter} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';

const RecommendedMoviesWidget = () => {
  const queryClient = useQueryClient(); // * Access the TanStack Query Client
  const lastMovieId = 278;
  const query = useQuery({
    queryKey: ['recommendedMovies'],
    queryFn: () => fetchRecommendedMovies(lastMovieId),
  });
  console.log(`recommendedMovies for id ${lastMovieId}: \n`, query);

  const refreshWidget = () => {};

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);
  return <></>;
};

export default RecommendedMoviesWidget;

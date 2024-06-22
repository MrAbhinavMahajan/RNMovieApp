import React, {useEffect} from 'react';
import {NativeAppEventEmitter} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchTopRatedMovies} from '../../../apis/Main';

const TopRatedMoviesWidget = () => {
  const queryClient = useQueryClient(); // * Access the TanStack Query Client
  const query = useQuery({
    queryKey: ['topRatedMovies'],
    queryFn: fetchTopRatedMovies,
  });
  console.log('topRatedMovies: \n', query);

  const refreshWidget = () => {};

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);
  return <></>;
};

export default TopRatedMoviesWidget;

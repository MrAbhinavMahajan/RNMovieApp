import React, {useEffect} from 'react';
import {NativeAppEventEmitter} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchUpcomingMovies} from '../../../apis/Main';

const UpcomingMoviesWidget = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: fetchUpcomingMovies,
  });
  console.log('upcomingMovies: \n', query);

  const refreshWidget = () => {};

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);
  return <></>;
};

export default UpcomingMoviesWidget;

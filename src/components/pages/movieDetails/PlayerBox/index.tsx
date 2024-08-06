/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {NativeAppEventEmitter, View} from 'react-native';
import {styles} from './styles';
import {PAGE_REFRESH} from '@constants/Page';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchMovieVideos} from '@apis/Main';
import {APP_QUERY_MAP} from '@constants/Api';
import {MovieVideoItem, MovieVideoItemTypes} from '@constants/AppInterfaces';

type PlayerBox = {
  movieId: number;
};

const PlayerBox = ({movieId}: PlayerBox) => {
  const queryClient = useQueryClient();
  const {data, isFetching, refetch} = useQuery({
    queryKey: [APP_QUERY_MAP.MOVIES_TRAILER],
    queryFn: ({signal}) => fetchMovieVideos(signal, movieId),
  });
  const videos: MovieVideoItem[] = data?.results;
  const trailerVideoItem = videos?.filter(
    el => el.type === MovieVideoItemTypes.TRAILER,
  )[0];

  const refreshData = () => {
    if (isFetching) {
      return;
    }
    refetch();
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(
      PAGE_REFRESH.MOVIE_DETAILS_SCREEN,
      refreshData,
    );
  }, []);

  useEffect(() => {
    // ! Invalidate Query Data for latest movieId
    queryClient.invalidateQueries({
      queryKey: [APP_QUERY_MAP.MOVIES_TRAILER],
      refetchType: 'active',
    });
  }, [movieId]);

  return <View style={styles.container}></View>;
};

export default PlayerBox;

import React, {useEffect, useRef} from 'react';
import {FlatList, NativeAppEventEmitter} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchNowPlayingMovies} from '../../../apis/Main';
import {styles} from './styles';
import MoviePosterWidget from '../MoviePoster';

const PopularMoviesWidget = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: fetchNowPlayingMovies,
  });
  console.log('nowPlayingMovies:\n', query);
  const {data, error, isLoading, isSuccess, refetch} = query;
  const listRef = useRef(null);
  const refreshWidget = () => {
    refetch();
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);

  return (
    <FlatList
      ref={listRef}
      data={data?.results || []}
      renderItem={data => {
        return (
          <MoviePosterWidget {...data} containerStyles={styles.movieItem} />
        );
      }}
      keyExtractor={item => `${item?.id}`}
      contentInsetAdjustmentBehavior={'automatic'}
      keyboardDismissMode="on-drag"
      numColumns={3}
      columnWrapperStyle={styles.columnWrapperView}
      contentContainerStyle={styles.scrollableContentView}
    />
  );
};

export default PopularMoviesWidget;

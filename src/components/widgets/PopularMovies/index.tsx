import React, {useEffect, useRef} from 'react';
import {FlatList, NativeAppEventEmitter} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchNowPlayingMovies} from '../../../apis/Main';
import {styles} from './styles';
import MovieItem from '../../pages/home/MovieItem';

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

  const onScroll = (event: any) => {
    const listScrollPos = event?.nativeEvent?.contentOffset?.y || 0;
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);

  return (
    <FlatList
      ref={listRef}
      onScroll={onScroll}
      data={data?.results || []}
      renderItem={data => {
        return <MovieItem {...data} />;
      }}
      keyExtractor={item => `${item?.id}`}
      numColumns={3}
      columnWrapperStyle={styles.columnWrapperView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollableContentView}
    />
  );
};

export default PopularMoviesWidget;

import React, {useEffect, useRef} from 'react';
import {FlatList, NativeAppEventEmitter} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchTrendingMovies} from '../../../apis/Main';
import MovieItem from '../../pages/home/MovieItem';
import {styles} from './styles';

const TrendingMoviesWidget = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: fetchTrendingMovies,
  });
  console.log('trendingMovies: \n', query);
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
        return <MovieItem {...data} />;
      }}
      keyExtractor={item => `${item?.id}`}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollableContentView}
    />
  );
};

export default TrendingMoviesWidget;

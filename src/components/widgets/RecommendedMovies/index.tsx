import {useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useRef} from 'react';
import {fetchRecommendedMovies} from '../../../apis/Main';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import MovieItem from '../../pages/home/MovieItem';
import {styles} from './styles';
import HeaderTitleWidget from '../HeaderTitle';

const RecommendedMoviesWidget = () => {
  const queryClient = useQueryClient(); // * Access the TanStack Query Client
  const lastMovieId = 278;
  const query = useQuery({
    queryKey: ['recommendedMovies'],
    queryFn: () => fetchRecommendedMovies(lastMovieId),
  });
  console.log(`recommendedMovies for id ${lastMovieId}: \n`, query);
  const {data, error, isLoading, isSuccess, refetch} = query;

  const listRef = useRef(null);

  const refreshWidget = () => {
    refetch();
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);

  return (
    <View>
      <HeaderTitleWidget
        title={'Recommended'}
        containerStyles={styles.headerView}
      />
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
    </View>
  );
};

export default RecommendedMoviesWidget;

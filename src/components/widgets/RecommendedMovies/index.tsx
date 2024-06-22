import {queryOptions, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useRef} from 'react';
import {fetchRecommendedMovies} from '../../../apis/Main';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import * as NavigationService from '../../../service/Navigation';
import {kROUTES} from '../../../constants/Navigation';
import {styles} from './styles';
import {PAGE_REFRESH} from '../../../constants/Page';
import HeaderTitleWidget from '../HeaderTitle';
import MovieItem from '../../pages/home/MovieItem';

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

  const onViewAllAction = () => {
    NavigationService.navigate(kROUTES.VIEW_ALL_MOVIES_SCREEN, {
      queryParams: {
        screenTitle: 'Recommended Movies',
      },
    });
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);

  return (
    <View>
      <HeaderTitleWidget
        title={'Recommended'}
        containerStyles={styles.headerView}
        rightCTAAction={onViewAllAction}
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

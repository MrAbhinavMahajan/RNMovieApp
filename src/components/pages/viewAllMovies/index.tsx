/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {
  fetchNowPlayingMovies,
  fetchRecommendedMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../../../apis/Main';
import MoviePosterWidget from '../../widgets/MoviePoster';
import {APP_WIDGETS_MAP} from '../../../constants/Navigation';

interface ViewAllMoviesScreenProps {
  route: {
    params: {
      queryParams: {
        screenTitle: string;
        widgetId: string;
      };
    };
  };
}

const ViewAllMoviesScreen = (props: ViewAllMoviesScreenProps) => {
  const queryClient = useQueryClient();
  const {queryParams} = props.route?.params;
  const {screenTitle, widgetId} = queryParams;
  const makeAPICall = async () => {
    switch (widgetId) {
      case APP_WIDGETS_MAP.NOW_PLAYING:
        return fetchNowPlayingMovies();

      case APP_WIDGETS_MAP.UPCOMING_MOVIES:
        return fetchUpcomingMovies();

      case APP_WIDGETS_MAP.TOP_RATED_MOVIES:
        return fetchTopRatedMovies();

      case APP_WIDGETS_MAP.RECOMMENDED_MOVIES:
        const lastMovieId = 278;
        return fetchRecommendedMovies(lastMovieId);
    }
  };

  const query = useQuery({
    queryKey: ['viewAllMovies'],
    queryFn: makeAPICall,
  });
  console.log('viewAllMovies: \n', query);
  const {data, error, isLoading, isSuccess, refetch} = query;

  const listRef = useRef(null);

  const onPageRefresh = () => {
    refetch();
  };

  return (
    <View style={styles.screenView}>
      <AppHeader title={screenTitle} />
      <FlatList
        ref={listRef}
        data={data?.results || []}
        renderItem={data => {
          return (
            <MoviePosterWidget {...data} containerStyles={styles.moviePoster} />
          );
        }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }
        keyExtractor={item => `${item?.id}`}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapperView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollableContentView}
      />
    </View>
  );
};

export default ViewAllMoviesScreen;

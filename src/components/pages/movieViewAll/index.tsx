/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useRef} from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {FlatList, RefreshControl, View} from 'react-native';
import {
  fetchMovieFavorites,
  fetchMovieWatchlist,
  fetchNowPlayingMovies,
  fetchRecommendedMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../../../apis/Main';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';
import {APP_WIDGETS_MAP} from '../../../constants/Navigation';
import MoviePosterWidget, {MoviePosterItem} from '../../widgets/MoviePoster';

interface MovieViewAllScreenProps {
  route: {
    params: {
      queryParams: {
        screenTitle: string;
        widgetId: string;
      };
    };
  };
}

const MovieViewAllScreen = (props: MovieViewAllScreenProps) => {
  const queryClient = useQueryClient();
  const {queryParams} = props?.route?.params || {};
  const {screenTitle, widgetId} = queryParams;
  const targetPage = useRef(1);
  const makeAPICall = async (signal: AbortSignal, pageParam = 1) => {
    switch (widgetId) {
      case APP_WIDGETS_MAP.NOW_PLAYING:
        return fetchNowPlayingMovies(signal, pageParam);

      case APP_WIDGETS_MAP.UPCOMING_MOVIES:
        return fetchUpcomingMovies(signal, pageParam);

      case APP_WIDGETS_MAP.TOP_RATED_MOVIES:
        return fetchTopRatedMovies(signal, pageParam);

      case APP_WIDGETS_MAP.RECOMMENDED_MOVIES:
        const lastMovieId = 278;
        return fetchRecommendedMovies(signal, lastMovieId, pageParam);

      case APP_WIDGETS_MAP.FAVORITE_MOVIES:
        return fetchMovieFavorites(signal, pageParam);

      case APP_WIDGETS_MAP.WATCHLIST_MOVIES:
        return fetchMovieWatchlist(signal, pageParam);
    }
  };

  const query = useInfiniteQuery({
    queryKey: ['viewAllMovies', widgetId],
    queryFn: ({pageParam, signal}) => makeAPICall(signal, pageParam),
    initialPageParam: targetPage.current,
    getNextPageParam: info => {
      if (targetPage.current > info.total_pages) {
        return undefined;
      }
      return targetPage.current;
    },
  });
  console.log('viewAllMovies: \n', query);
  const {data, refetch, fetchNextPage} = query;
  const listRef = useRef(null);
  const movies = useMemo(() => {
    return data?.pages.flatMap(page => page.results) || [];
  }, [data?.pages]);
  console.log('movies :', movies);

  const onPageRefresh = () => {
    refetch();
  };

  const onEndReached = () => {
    targetPage.current = targetPage.current + 1;
    fetchNextPage();
  };

  useEffect(() => {
    return () => {
      queryClient.cancelQueries({queryKey: ['viewAllMovies', widgetId]});
    };
  }, []);

  return (
    <View style={styles.screenView}>
      <AppHeader title={screenTitle} />
      <FlatList
        ref={listRef}
        data={movies || []}
        renderItem={({item, index}: {item: MoviePosterItem; index: number}) => (
          <MoviePosterWidget
            item={item}
            index={index}
            containerStyles={styles.moviePoster}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }
        keyExtractor={item => `${item?.id}`}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapperView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollableContentView}
        onEndReached={onEndReached}
      />
    </View>
  );
};

export default MovieViewAllScreen;

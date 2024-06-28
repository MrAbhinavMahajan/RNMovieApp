/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo} from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from 'react-native-reanimated';
import * as NavigationService from '../../../service/Navigation';
import {
  fetchMovieFavorites,
  fetchMovieWatchlist,
  fetchNowPlayingMovies,
  fetchRecommendedMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../../../apis/Main';
import {styles} from './styles';
import {APP_TABS_MAP, APP_WIDGETS_MAP} from '../../../constants/Navigation';
import {STD_ACTIVITY_COLOR} from '../../../constants/Styles';
import {AppArrowUpIcon, AppSearchIcon} from '../../common/RNIcon';
import AppHeader from '../../common/AppHeader';
import AppCTA from '../../common/AppCTA';
import MoviePosterWidget, {MoviePosterItem} from '../../widgets/MoviePoster';
import RNText from '../../common/RNText';
import ErrorInfoWidget from '../../widgets/ErrorInfo';

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
  const makeAPICall = async (signal: AbortSignal, pageParam = 1) => {
    switch (widgetId) {
      case APP_WIDGETS_MAP.NOW_PLAYING:
        return fetchNowPlayingMovies(signal, pageParam);

      case APP_WIDGETS_MAP.UPCOMING_MOVIES:
        return fetchUpcomingMovies(signal, pageParam);

      case APP_WIDGETS_MAP.TOP_RATED_MOVIES:
        return fetchTopRatedMovies(signal, pageParam);

      case APP_WIDGETS_MAP.RECOMMENDED_MOVIES:
        return fetchRecommendedMovies(signal, pageParam);

      case APP_WIDGETS_MAP.FAVORITE_MOVIES:
        return fetchMovieFavorites(signal, pageParam);

      case APP_WIDGETS_MAP.WATCHLIST_MOVIES:
        return fetchMovieWatchlist(signal, pageParam);
    }
  };

  const query = useInfiniteQuery({
    queryKey: ['viewAllMovies', widgetId],
    queryFn: ({pageParam, signal}) => makeAPICall(signal, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.page > lastPage.total_pages) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
  console.log('viewAllMovies: \n', query);
  const {
    data,
    refetch,
    isLoading, // isLoading -> true for Initial Loading
    isFetching, // isFetching -> is true when Data is present & either new or old data being fetched
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = query;
  const listRef = useAnimatedRef<any>();
  const scrollHandler = useScrollViewOffset(listRef); // * Gives Current offset of ScrollView
  console.log('ViewAllMovies Data :\n', data);
  const movies = useMemo(() => {
    return data?.pages.flatMap(page => page.results) || [];
  }, [data?.pages]);
  console.log('View-All Movies :', movies);

  const scrollToTopCTAFadeAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 600 ? 1 : 0),
  }));

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const onPageRefresh = () => {
    // ! Refetch All the Query Data
    refetch();
  };

  const onSearchCTA = () => {
    NavigationService.navigate(APP_TABS_MAP.SEARCH_TAB);
  };

  const keyExtractor = (item: MoviePosterItem) => `${item?.id}`;

  useEffect(() => {
    return () => {
      // ! Cancelling Query Data on unmount
      queryClient.cancelQueries({queryKey: ['viewAllMovies', widgetId]});
    };
  }, []);

  const onEndReached = () => {
    if (isFetching) {
      // ! Throttle unnecessary API Calls
      return;
    }
    if (hasNextPage) {
      // ! hasNextPage becomes false when getNextPageParam returns undefined
      fetchNextPage();
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: MoviePosterItem;
    index: number;
  }) => (
    <MoviePosterWidget
      item={item}
      index={index}
      containerStyles={styles.moviePoster}
    />
  );

  const renderListHeader = () => {
    if (isError) {
      return (
        <ErrorInfoWidget
          error={error}
          containerStyles={styles.errorContainer}
          retryCTA={onPageRefresh}
        />
      );
    }
    return <></>;
  };

  const renderListFooter = () => {
    if (isFetchingNextPage) {
      return <ActivityIndicator color={STD_ACTIVITY_COLOR} />;
    }
    return <></>;
  };

  const renderListEmptyCard = () => {
    if (isError || isLoading || isFetching) {
      return <></>;
    }
    return <RNText>No Movies Found</RNText>;
  };

  const RightComponent = (
    <AppCTA onPress={onSearchCTA}>
      <AppSearchIcon />
    </AppCTA>
  );

  return (
    <View style={styles.screenView}>
      <AppHeader title={screenTitle} RightComponent={RightComponent} />
      {isLoading && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'large'} color={STD_ACTIVITY_COLOR} />
        </View>
      )}
      <FlatList
        ref={listRef}
        data={movies || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapperView}
        contentContainerStyle={styles.scrollableContentView}
        onEndReached={onEndReached}
        onEndReachedThreshold={5} // tells FlatList to trigger onEndReached earlier
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderListEmptyCard}
        initialNumToRender={10} // items to render in initial render batch
        maxToRenderPerBatch={10} // limits the number of items rendered per incremental batch
        extraData={movies} // tells FlatList to render whenever the chosen variable updates
        windowSize={1} // the number of "pages" of items rendered in either direction from the visible content
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }
      />
      <Animated.View
        style={[styles.scrollToTopBtn, scrollToTopCTAFadeAnimationStyles]}>
        <AppCTA hitSlop={styles.scrollToTopBtnHitSlop} onPress={scrollToTop}>
          <AppArrowUpIcon />
        </AppCTA>
      </Animated.View>
    </View>
  );
};

export default MovieViewAllScreen;

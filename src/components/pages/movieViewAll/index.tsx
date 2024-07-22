/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo} from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
  FadeInRight,
  FadeOut,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import * as NavigationService from '@service/Navigation';
import {
  fetchNowPlayingMovies,
  fetchRecommendedMoviesV4,
  fetchSimilarMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '@apis/Main';
import {styles} from './styles';
import {
  APP_PAGES_MAP,
  APP_TABS_MAP,
  APP_WIDGETS_MAP,
} from '@constants/Navigation';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
import {AppArrowUpIcon, AppSearchIcon} from '@components/common/RNIcon';
import {APP_QUERY_MAP} from '@constants/Api';
import {MoviePosterItem} from '@constants/AppInterfaces';
import AppHeader from '@components/common/AppHeader';
import AppCTA from '@components/common/AppCTA';
import MoviePosterWidget from '@components/widgets/MoviePoster';
import ErrorStateWidget from '@components/widgets/ErrorState';
import EmptyStateCreativeCard from '@components/common/EmptyStateCard';
import {useIsFocused} from '@react-navigation/native';

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
  const isFocussed = useIsFocused();
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
        return fetchRecommendedMoviesV4(signal, pageParam);

      case APP_WIDGETS_MAP.SIMILAR_MOVIES:
        return fetchSimilarMovies(signal, pageParam);
    }
  };

  const query = useInfiniteQuery({
    queryKey: [APP_QUERY_MAP.VIEW_ALL_MOVIES, widgetId],
    queryFn: ({pageParam, signal}) => makeAPICall(signal, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.page > lastPage.total_pages) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    enabled: isFocussed,
  });
  const {
    data,
    refetch,
    isLoading, // isLoading -> true for Initial Loading
    isFetching, // isFetching -> is true when Data is present & either new or old data being fetched
    isRefetching,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = query;
  const listRef = useAnimatedRef<any>();
  const scrollHandler = useScrollViewOffset(listRef); // * Gives Current offset of ScrollView
  const movies = useMemo(() => {
    if (isError) {
      return [];
    }
    return data?.pages.flatMap(page => page.results) || [];
  }, [data?.pages, isError]);

  const scrollToTopCTAAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 600 ? 1 : 0),
    transform: [
      {
        translateY: withRepeat(
          withSequence(withTiming(-15), withTiming(0)),
          -1,
          true,
        ),
      },
    ],
  }));

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const refreshPage = () => {
    if (isFetching) {
      return;
    }
    // ! Refetch All the Query Data
    refetch();
  };

  const onSearchCTA = () => {
    NavigationService.navigate(APP_TABS_MAP.SEARCH_TAB);
  };

  const keyExtractor = (item: MoviePosterItem) => `${item?.id}`;

  useEffect(() => {
    return () => {
      // ! Cancelling Query in Progress on unmount
      queryClient.cancelQueries({
        queryKey: [APP_QUERY_MAP.VIEW_ALL_MOVIES, widgetId],
      });
      // ! Removing Query Data on unmount
      queryClient.removeQueries({
        queryKey: [APP_QUERY_MAP.VIEW_ALL_MOVIES],
      });
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

  const renderListHeader = () => {
    if (isError) {
      return (
        <ErrorStateWidget
          error={error}
          containerStyles={styles.errorContainer}
          retryCTA={refreshPage}
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
    return (
      <EmptyStateCreativeCard
        title={'Oops!'}
        message={'No Data Found'}
        retryCTA={refreshPage}
      />
    );
  };

  const RightComponent = (
    <AppCTA onPress={onSearchCTA}>
      <AppSearchIcon />
    </AppCTA>
  );

  return (
    <View style={styles.screenView}>
      <AppHeader
        title={screenTitle}
        RightComponent={RightComponent}
        safePaddingEnabled={true}
        transparentBackgroundEnabled={false}
      />
      {(isLoading || isRefetching) && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'large'} color={STD_ACTIVITY_COLOR} />
        </View>
      )}
      <FlatList
        ref={listRef}
        data={movies || []}
        renderItem={({item, index}: {item: MoviePosterItem; index: number}) => (
          <MovieCard item={item} index={index} />
        )}
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
          <RefreshControl refreshing={false} onRefresh={refreshPage} />
        }
      />
      <Animated.View
        style={[styles.scrollToTopBtn, scrollToTopCTAAnimationStyles]}>
        <AppCTA hitSlop={styles.scrollToTopBtnHitSlop} onPress={scrollToTop}>
          <AppArrowUpIcon />
        </AppCTA>
      </Animated.View>
    </View>
  );
};

const MovieCard = ({item, index}: {item: MoviePosterItem; index: number}) => {
  const {title, id} = item || {};
  const onCTA = () => {
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
      queryParams: {screenTitle: title, movieId: id},
    });
  };
  return (
    <Animated.View entering={FadeInRight} exiting={FadeOut}>
      <MoviePosterWidget
        item={item}
        index={index}
        containerStyles={styles.moviePoster}
        action={onCTA}
      />
    </Animated.View>
  );
};

export default MovieViewAllScreen;

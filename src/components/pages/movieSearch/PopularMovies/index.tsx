/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo} from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import * as NavigationService from '@service/Navigation';
import Animated, {
  FadeInRight,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {fetchPopularMovies} from '@apis/Main';
import {AppArrowUpIcon} from '@components/common/RNIcon';
import {APP_PAGES_MAP} from '@constants/Navigation';
import {APP_QUERY_MAP} from '@constants/Api';
import {MoviePosterItem} from '@constants/AppInterfaces';
import {FALLBACK_DATA} from '~/src/data/Main';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
import {onPageClickEvent, onPageRefreshEvent} from '~/src/analytics';
import {styles} from './styles';
import AppCTA from '@components/common/AppCTA';
import MoviePosterWidget from '@components/widgets/MoviePoster';
import ErrorStateCard from '@components/common/ErrorState';
import EmptyStateCreativeCard from '@components/common/EmptyStateCard';

const PopularMovies = () => {
  const queryClient = useQueryClient();
  const query = useInfiniteQuery({
    queryKey: [APP_QUERY_MAP.POPULAR_MOVIES],
    queryFn: ({signal, pageParam}) => fetchPopularMovies(signal, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.page > lastPage.total_pages) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
  const {
    data,
    refetch,
    isLoading, // isLoading -> true for Initial Loading
    isFetching, // isFetching -> is true when Data is present & either new or old data being fetched
    isRefetching,
    isFetchingNextPage,
    hasNextPage, // ! hasNextPage becomes false when getNextPageParam returns undefined
    fetchNextPage,
    isError,
    error,
  } = query;
  const listRef = useAnimatedRef<any>();
  const scrollHandler = useScrollViewOffset(listRef); // * Gives Current offset of ScrollView
  const movies = useMemo(() => {
    if (isError) {
      return [];
    }
    return data?.pages.flatMap(page => page.results) || FALLBACK_DATA;
  }, [data, isError]);

  const refreshData = () => {
    if (isFetching) {
      return;
    }
    onPageRefreshEvent({
      pageID: APP_PAGES_MAP.SEARCH_SCREEN,
      extraData: {
        pageID: 'POPULAR_MOVIES',
      },
    });
    refetch();
  };

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
    onPageClickEvent({
      pageID: APP_PAGES_MAP.SEARCH_SCREEN,
      name: 'SCROLL TO TOP CTA',
      extraData: {
        pageID: 'POPULAR_MOVIES',
      },
    });
    listRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const keyExtractor = (item: MoviePosterItem) => `${item?.id}`;

  useEffect(() => {
    return () => {
      // ! Cancelling Query in Progress on unmount
      queryClient.cancelQueries({queryKey: [APP_QUERY_MAP.POPULAR_MOVIES]});
    };
  }, []);

  const onEndReached = () => {
    if (isFetching) {
      // ! Throttle unnecessary API Calls
      return;
    }
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderListHeader = () => {
    if (isError) {
      return (
        <ErrorStateCard
          error={error}
          containerStyles={styles.errorContainer}
          retryCTA={refreshData}
          id={APP_PAGES_MAP.SEARCH_SCREEN}
          extraData={{
            id: 'POPULAR_MOVIES',
          }}
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
        retryCTA={refreshData}
      />
    );
  };

  return (
    <View style={styles.containerView}>
      {(isLoading || isRefetching) && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'large'} color={STD_ACTIVITY_COLOR} />
        </View>
      )}

      <FlatList
        ref={listRef}
        data={movies}
        renderItem={({item, index}: {item: MoviePosterItem; index: number}) => (
          <MovieCard item={item} index={index} />
        )}
        keyExtractor={keyExtractor}
        contentInsetAdjustmentBehavior={'automatic'}
        keyboardDismissMode="on-drag"
        numColumns={3}
        columnWrapperStyle={styles.columnWrapperView}
        contentContainerStyle={styles.scrollableContentView}
        onEndReached={onEndReached}
        onEndReachedThreshold={5}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderListEmptyCard}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        extraData={movies}
        windowSize={1}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshData} />
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
    onPageClickEvent({
      pageID: APP_PAGES_MAP.SEARCH_SCREEN,
      name: 'MOVIE POSTER CTA',
      extraData: {
        ...item,
        pageID: 'POPULAR_MOVIES',
      },
    });
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
      queryParams: {screenTitle: title, movieId: id},
    });
  };
  return (
    <Animated.View entering={FadeInRight}>
      <MoviePosterWidget
        item={item}
        index={index}
        containerStyles={styles.moviePoster}
        action={onCTA}
      />
    </Animated.View>
  );
};
export default PopularMovies;

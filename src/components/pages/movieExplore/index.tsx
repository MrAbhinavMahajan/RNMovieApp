/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import * as NavigationService from '@service/Navigation';
import {styles} from './styles';
import Animated, {
  FadeInRight,
  FadeOut,
  useAnimatedRef,
} from 'react-native-reanimated';
import AppCTA from '../../common/AppCTA';
import EmptyStateCreativeCard from '../../common/EmptyStateCard';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {APP_QUERY_MAP} from '~/src/constants/Api';
import {fetchRecommendedMoviesV4} from '~/src/apis/Main';
import AppHeader from '../../common/AppHeader';
import {MoviePosterItem} from '~/src/constants/AppInterfaces';
import {STD_ACTIVITY_COLOR} from '~/src/constants/Styles';
import ErrorStateWidget from '../../widgets/ErrorState';
import MoviePosterWidget from '../../widgets/MoviePoster';
import {APP_PAGES_MAP} from '~/src/constants/Navigation';

const MovieExploreScreen = () => {
  const queryClient = useQueryClient();
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
  } = useInfiniteQuery({
    queryKey: [APP_QUERY_MAP.EXPLORE_MOVIES],
    queryFn: ({pageParam, signal}) =>
      fetchRecommendedMoviesV4(signal, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.page > lastPage.total_pages) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
  const listRef = useAnimatedRef<any>();
  const movies = useMemo(() => {
    if (isError) {
      return [];
    }
    return data?.pages.flatMap(page => page.results) || [];
  }, [data?.pages, isError]);

  const refreshPage = () => {
    if (isFetching) {
      return;
    }
    // ! Refetch All the Query Data
    refetch();
  };

  const keyExtractor = (item: MoviePosterItem) => `${item?.id}`;

  useEffect(() => {
    return () => {
      // ! Cancelling Query in Progress on unmount
      queryClient.cancelQueries({
        queryKey: [APP_QUERY_MAP.EXPLORE_MOVIES],
      });
      // ! Removing Query Data on unmount
      queryClient.removeQueries({
        queryKey: [APP_QUERY_MAP.EXPLORE_MOVIES],
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

  const RightComponent = <AppCTA onPress={{}}></AppCTA>;

  return (
    <View style={styles.screenView}>
      <AppHeader
        RightComponent={RightComponent}
        safePaddingEnabled={true}
        transparentBackgroundEnabled={true}
        floatingEnabled={true}
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

export default MovieExploreScreen;

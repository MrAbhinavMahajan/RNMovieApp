/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {styles} from './styles';
import {useAnimatedRef} from 'react-native-reanimated';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {APP_QUERY_MAP} from '~/src/constants/Api';
import {fetchDiscoverMovies} from '~/src/apis/Main';
import {
  DiscoverQueryParams,
  MoviePosterItem,
} from '~/src/constants/AppInterfaces';
import {STD_ACTIVITY_COLOR} from '~/src/constants/Styles';
import MovieCard from './MovieCard';
import EmptyStateCreativeCard from '../../common/EmptyStateCard';
import ErrorStateWidget from '../../widgets/ErrorState';
import {useIsFocused} from '@react-navigation/native';

const MovieExploreScreen = () => {
  const queryClient = useQueryClient();
  const isFocussed = useIsFocused();
  const [filters, setFilters] = useState<DiscoverQueryParams>({});
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
      fetchDiscoverMovies(signal, {
        ...filters,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.page > lastPage.total_pages) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    enabled: isFocussed,
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

  return (
    <View style={styles.screenView}>
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
        horizontal
        pagingEnabled
        keyExtractor={keyExtractor}
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
          <RefreshControl refreshing={false} onRefresh={refreshPage} />
        }
      />
    </View>
  );
};

export default MovieExploreScreen;

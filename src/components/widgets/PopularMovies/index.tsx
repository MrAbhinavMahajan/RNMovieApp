import React, {useEffect, useMemo} from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from 'react-native-reanimated';
import {fetchPopularMovies} from '../../../apis/Main';
import {AppArrowUpIcon} from '../../common/RNIcon';
import {FALLBACK_DATA} from '../../data/Main';
import {styles} from './styles';
import AppCTA from '../../common/AppCTA';
import MoviePosterWidget, {MoviePosterItem} from '../MoviePoster';
import {STD_ACTIVITY_COLOR} from '../../../constants/Styles';

const PopularMoviesWidget = () => {
  const queryClient = useQueryClient();
  const query = useInfiniteQuery({
    queryKey: ['popularMovies'],
    queryFn: ({signal, pageParam}) => fetchPopularMovies(signal, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.page > lastPage.total_pages) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
  console.log('popularMovies:\n', query);
  const {
    data,
    refetch,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = query;
  const listRef = useAnimatedRef<any>();
  const scrollHandler = useScrollViewOffset(listRef); // * Gives Current offset of ScrollView
  const movies = useMemo(() => {
    return data?.pages.flatMap(page => page.results) || [];
  }, [data]);

  const refreshWidget = () => {
    refetch();
  };

  const scrollToTopCTAFadeAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 600 ? 1 : 0),
  }));

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  useEffect(() => {
    return () => {
      queryClient.cancelQueries({queryKey: ['popularMovies']});
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

  const renderListFooter = () => {
    if (isFetchingNextPage) {
      return <ActivityIndicator color={STD_ACTIVITY_COLOR} />;
    }
    return <></>;
  };

  return (
    <View style={styles.containerView}>
      <FlatList
        ref={listRef}
        data={movies || FALLBACK_DATA}
        renderItem={({item, index}: {item: MoviePosterItem; index: number}) => (
          <MoviePosterWidget
            item={item}
            index={index}
            containerStyles={styles.moviePoster}
          />
        )}
        keyExtractor={item => `${item?.id}`}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshWidget} />
        }
        contentInsetAdjustmentBehavior={'automatic'}
        keyboardDismissMode="on-drag"
        numColumns={3}
        columnWrapperStyle={styles.columnWrapperView}
        contentContainerStyle={styles.scrollableContentView}
        onEndReached={onEndReached}
        onEndReachedThreshold={5}
        ListFooterComponent={renderListFooter}
        windowSize={1}
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

export default PopularMoviesWidget;

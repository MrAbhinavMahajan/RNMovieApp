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
import RNText from '../../common/RNText';
import ErrorInfoWidget from '../ErrorInfo';

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
    isLoading, // isLoading -> true for Initial Loading
    isFetching, // isFetching -> is true when Data is present & either new or old data being fetched
    isFetchingNextPage,
    hasNextPage, // ! hasNextPage becomes false when getNextPageParam returns undefined
    fetchNextPage,
    isError,
    error,
  } = query;
  const listRef = useAnimatedRef<any>();
  const scrollHandler = useScrollViewOffset(listRef); // * Gives Current offset of ScrollView
  console.log('PopularMovies Data :\n', data);
  const movies = useMemo(() => {
    return data?.pages.flatMap(page => page.results) || FALLBACK_DATA;
  }, [data]);
  console.log('PopularMovies :\n', movies);

  const refreshWidget = () => {
    refetch();
  };

  const scrollToTopCTAFadeAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 600 ? 1 : 0),
  }));

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const keyExtractor = (item: MoviePosterItem) => `${item?.id}`;

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
          retryCTA={refreshWidget}
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

  return (
    <View style={styles.containerView}>
      {isLoading && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'large'} color={STD_ACTIVITY_COLOR} />
        </View>
      )}

      <FlatList
        ref={listRef}
        data={movies}
        renderItem={renderItem}
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
          <RefreshControl refreshing={false} onRefresh={refreshWidget} />
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

export default PopularMoviesWidget;

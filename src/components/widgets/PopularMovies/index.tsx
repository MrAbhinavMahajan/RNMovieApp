import React, {useEffect, useMemo, useRef} from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {FlatList, RefreshControl, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from 'react-native-reanimated';
import {fetchPopularMovies} from '../../../apis/Main';
import {styles} from './styles';
import {AppArrowUpIcon} from '../../common/RNIcon';
import {FALLBACK_DATA} from '../../data/Main';
import MoviePosterWidget, {MoviePosterItem} from '../MoviePoster';
import AppCTA from '../../common/AppCTA';

const PopularMoviesWidget = () => {
  const queryClient = useQueryClient();
  const targetPage = useRef(1);
  const query = useInfiniteQuery({
    queryKey: ['popularMovies'],
    queryFn: ({signal, pageParam}) => fetchPopularMovies(signal, pageParam),
    initialPageParam: targetPage.current,
    getNextPageParam: info => {
      if (targetPage.current > info.total_pages) {
        return undefined;
      }
      return targetPage.current;
    },
  });
  console.log('popularMovies:\n', query);
  const {data, refetch, fetchNextPage} = query;
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

  const onEndReached = () => {
    targetPage.current = targetPage.current + 1;
    fetchNextPage();
  };

  useEffect(() => {
    return () => {
      queryClient.cancelQueries({queryKey: ['popularMovies']});
    };
  }, []);

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

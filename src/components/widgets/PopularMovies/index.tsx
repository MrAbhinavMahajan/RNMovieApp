import React, {useEffect} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchNowPlayingMovies} from '../../../apis/Main';
import {styles} from './styles';
import MoviePosterWidget, {MoviePosterItem} from '../MoviePoster';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from 'react-native-reanimated';
import AppCTA from '../../common/AppCTA';
import {AppArrowUpIcon} from '../../common/RNIcon';

const PopularMoviesWidget = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: fetchNowPlayingMovies,
  });
  console.log('nowPlayingMovies:\n', query);
  const {data, error, isLoading, isSuccess, refetch} = query;
  const listRef = useAnimatedRef<any>();
  const scrollHandler = useScrollViewOffset(listRef); // * Gives Current offset of ScrollView

  const refreshWidget = () => {
    refetch();
  };

  const scrollToTopCTAFadeAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 600 ? 1 : 0),
  }));

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.containerView}>
      <FlatList
        ref={listRef}
        data={data?.results || []}
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

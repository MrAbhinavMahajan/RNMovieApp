/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo} from 'react';
import _ from 'lodash';
import {useInfiniteQuery} from '@tanstack/react-query';
import * as NavigationService from '@service/Navigation';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
  SlideInLeft,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import {APP_PAGES_MAP} from '@constants/Navigation';
import {fetchSearchedMovieResults} from '@apis/Main';
import {AppArrowUpIcon} from '@components/common/RNIcon';
import {styles} from './styles';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
import {MovieItem} from '@constants/AppInterfaces';
import {APP_QUERY_MAP} from '@constants/Api';
import AppCTA from '@components/common/AppCTA';
import RNText from '@components/common/RNText';
import MoviePosterWidget from '../MoviePoster';
import ErrorStateWidget from '../ErrorState';
import EmptyStateCreativeCard from '@components/common/EmptyStateCard';
import {useIsFocused} from '@react-navigation/native';
const AnimatedCTA = Animated.createAnimatedComponent(TouchableOpacity);

interface SearchedResultsWidgetProps {
  searchedText: string;
}

const SearchedResultsWidget = (props: SearchedResultsWidgetProps) => {
  const {searchedText} = props;
  const isFocussed = useIsFocused();
  const query = useInfiniteQuery({
    queryKey: [APP_QUERY_MAP.SEARCHED_RESULTS],
    queryFn: ({signal, pageParam}) =>
      fetchSearchedMovieResults(signal, searchedText, pageParam),
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
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = query;
  const listRef = useAnimatedRef<any>();
  const scrollHandler = useScrollViewOffset(listRef); // * Gives Current offset of ScrollView
  const movies = useMemo(() => {
    if (isError) {
      return <></>;
    }
    return data?.pages.flatMap(page => page.results) || [];
  }, [data, isError]);

  useEffect(() => {
    if (searchedText) {
      refetch();
    }
  }, [searchedText]);

  const refreshWidget = () => {
    if (isFetching) {
      return;
    }
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
    listRef.current?.scrollToOffset({animated: true, offset: 0});
  };

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
    return (
      <EmptyStateCreativeCard
        title={'Oops!'}
        message={'No Data Found'}
        retryCTA={refreshWidget}
      />
    );
  };

  const keyExtractor = (item: MovieItem, index: number) =>
    `${item?.id}${index}`;

  return (
    <View
      style={styles.containerView}
      pointerEvents={isLoading ? 'none' : 'auto'}>
      {isLoading && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'large'} color={STD_ACTIVITY_COLOR} />
        </View>
      )}

      <FlatList
        ref={listRef}
        data={movies}
        renderItem={({item, index}: {item: MovieItem; index: number}) => (
          <MovieCard item={item} index={index} />
        )}
        keyExtractor={keyExtractor}
        contentInsetAdjustmentBehavior={'automatic'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scrollableContentView}
        onEndReached={onEndReached}
        onEndReachedThreshold={5}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderListEmptyCard}
        ItemSeparatorComponent={ItemSeparatorComponent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        extraData={movies}
        windowSize={1}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshWidget} />
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

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const MovieCard = ({item, index}: {item: MovieItem; index: number}) => {
  const {title, id, vote_average, overview} = item || {};
  const onCTA = () => {
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
      queryParams: {screenTitle: title, movieId: id},
    });
  };
  return (
    <AnimatedCTA
      entering={SlideInLeft}
      style={styles.itemContainerView}
      onPress={onCTA}>
      <MoviePosterWidget
        item={item}
        index={index}
        containerStyles={styles.moviePoster}
        action={onCTA}
      />
      <View style={styles.itemInfoView}>
        <RNText numberOfLines={1} style={styles.itemTitleText}>
          {title}
        </RNText>
        {!_.isEmpty(overview) && (
          <RNText numberOfLines={3} style={styles.itemInfoText}>
            {overview}
          </RNText>
        )}
        {vote_average > 0 && (
          <RNText style={styles.itemVoteText}>
            ✪ {vote_average?.toFixed(1)}
          </RNText>
        )}
      </View>
    </AnimatedCTA>
  );
};
export default SearchedResultsWidget;

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
  withRepeat,
  withSequence,
  SlideInLeft,
} from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';
import {APP_PAGES_MAP} from '@constants/Navigation';
import {fetchSearchedMovieResults} from '@apis/Main';
import {AppArrowUpIcon} from '@components/common/RNIcon';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
import {MovieItem} from '@constants/AppInterfaces';
import {APP_QUERY_MAP} from '@constants/Api';
import {styles} from './styles';
import AppCTA from '@components/common/AppCTA';
import RNText from '@components/common/RNText';
import MoviePosterWidget from '@components/widgets/MoviePoster';
import ErrorStateWidget from '@components/widgets/ErrorState';
import EmptyStateCreativeCard from '@components/common/EmptyStateCard';
import {vpx} from '~/src/libraries/responsive-pixels';
const AnimatedCTA = Animated.createAnimatedComponent(TouchableOpacity);

interface SearchedResultsWidgetProps {
  searchedText: string;
}

interface MovieCardProps {
  item: MovieItem;
  index: number;
}

const ITEM_SIZE = vpx(140);

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
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = query;
  const scrollRef = useAnimatedRef<any>();
  const scrollHandler = useScrollViewOffset(scrollRef);
  const movies = useMemo(() => {
    if (isError) {
      return [];
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
    scrollRef.current?.scrollToOffset({animated: true, offset: 0});
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
    return null;
  };

  const renderListFooter = () => {
    if (isFetchingNextPage) {
      return <ActivityIndicator color={STD_ACTIVITY_COLOR} />;
    }
    return null;
  };

  const renderListEmptyCard = () => {
    if (isError || isLoading || isFetching) {
      return null;
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
        ref={scrollRef}
        data={movies}
        renderItem={({item, index}) => <MovieCard item={item} index={index} />}
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

const MovieCard = ({item, index}: MovieCardProps) => {
  const {title, vote_average, overview, id} = item || {};

  const onCTA = () => {
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
      queryParams: {screenTitle: title, movieId: id},
    });
  };

  return (
    <AnimatedCTA
      entering={SlideInLeft}
      style={[styles.itemContainerView, {height: ITEM_SIZE}]}
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

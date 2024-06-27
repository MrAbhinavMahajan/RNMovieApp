/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo} from 'react';
import _ from 'lodash';
import {useInfiniteQuery} from '@tanstack/react-query';
import * as NavigationService from '../../../service/Navigation';
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
} from 'react-native-reanimated';
import {APP_PAGES_MAP} from '../../../constants/Navigation';
import {fetchSearchedMovieResults} from '../../../apis/Main';
import {AppArrowUpIcon} from '../../common/RNIcon';
import {styles} from './styles';
import {STD_ACTIVITY_COLOR} from '../../../constants/Styles';
import AppCTA from '../../common/AppCTA';
import RNText from '../../common/RNText';
import MoviePosterWidget from '../MoviePoster';
import ErrorInfoWidget from '../ErrorInfo';

interface SearchedResultsWidgetProps {
  searchedText: string;
}

const SearchedResultsWidget = (props: SearchedResultsWidgetProps) => {
  const {searchedText} = props;
  const query = useInfiniteQuery({
    queryKey: ['searchedMovies'],
    queryFn: ({signal, pageParam}) =>
      fetchSearchedMovieResults(signal, searchedText, pageParam),
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
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = query;
  const listRef = useAnimatedRef<any>();
  const scrollHandler = useScrollViewOffset(listRef); // * Gives Current offset of ScrollView
  console.log('Search Data :\n', data);
  const movies = useMemo(() => {
    return data?.pages.flatMap(page => page.results) || [];
  }, [data]);
  console.log('Search Movies::::', movies);

  useEffect(() => {
    if (searchedText) {
      refetch();
    }
  }, [searchedText]);

  const refreshWidget = () => {
    refetch();
  };

  const scrollToTopCTAFadeAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 600 ? 1 : 0),
  }));

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    const {title, id, vote_average, overview} = item || {};

    return (
      <TouchableOpacity
        style={styles.itemContainerView}
        onPress={() => {
          NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
            queryParams: {screenTitle: title, movieId: id},
          });
        }}>
        <MoviePosterWidget
          item={item}
          index={index}
          containerStyles={styles.moviePoster}
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
      </TouchableOpacity>
    );
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
    return <RNText>No Results Found</RNText>;
  };

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
        renderItem={renderItem}
        keyExtractor={item => `${item?.id}`}
        contentInsetAdjustmentBehavior={'automatic'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scrollableContentView}
        ItemSeparatorComponent={ItemSeparatorComponent}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshWidget} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={5}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderListEmptyCard}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        extraData={movies}
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

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

export default SearchedResultsWidget;

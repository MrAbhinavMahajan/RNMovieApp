/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useRef} from 'react';
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
import MoviePosterWidget from '../MoviePoster';
import RNText from '../../common/RNText';
import AppCTA from '../../common/AppCTA';

interface SearchedResultsWidgetProps {
  searchedText: string;
}

const SearchedResultsWidget = (props: SearchedResultsWidgetProps) => {
  const {searchedText} = props;
  const targetPage = useRef(1);
  const query = useInfiniteQuery({
    queryKey: ['searchedMovies'],
    queryFn: ({signal, pageParam}) =>
      fetchSearchedMovieResults(signal, searchedText, pageParam),
    initialPageParam: targetPage.current,
    getNextPageParam: info => {
      if (targetPage.current > info.total_pages) {
        return undefined;
      }
      return targetPage.current;
    },
  });
  const {data, isLoading, refetch, fetchNextPage} = query;
  const listRef = useAnimatedRef<any>();
  const scrollHandler = useScrollViewOffset(listRef); // * Gives Current offset of ScrollView

  const movies = useMemo(() => {
    return data?.pages.flatMap(page => page.results) || [];
  }, [data]);

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
    targetPage.current = targetPage.current + 1;
    fetchNextPage();
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
        data={movies || []}
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

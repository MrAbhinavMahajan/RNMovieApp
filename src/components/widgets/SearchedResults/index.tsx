/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import _ from 'lodash';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import * as NavigationService from '../../../service/Navigation';
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
import MoviePosterWidget from '../MoviePoster';
import RNText from '../../common/RNText';
import AppCTA from '../../common/AppCTA';

interface SearchedResultsWidgetProps {
  searchedText: string;
}

const SearchedResultsWidget = (props: SearchedResultsWidgetProps) => {
  const {searchedText} = props;
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['searchedMovies'],
    queryFn: () => fetchSearchedMovieResults(searchedText),
  });
  const {data, error, isLoading, isSuccess, refetch} = query;
  const listRef = useAnimatedRef<any>();
  const scrollHandler = useScrollViewOffset(listRef); // * Gives Current offset of ScrollView

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

  const renderItem = (itemProps: any) => {
    const {title, id, vote_average, overview} = itemProps?.item;

    return (
      <TouchableOpacity
        style={styles.itemContainerView}
        onPress={() => {
          NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
            queryParams: {screenTitle: title, movieId: id},
          });
        }}>
        <MoviePosterWidget
          {...itemProps}
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

  return (
    <View style={styles.containerView}>
      <FlatList
        ref={listRef}
        data={data?.results || []}
        renderItem={renderItem}
        keyExtractor={item => `${item?.id}`}
        contentInsetAdjustmentBehavior={'automatic'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scrollableContentView}
        ItemSeparatorComponent={ItemSeparatorComponent}
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

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

export default SearchedResultsWidget;

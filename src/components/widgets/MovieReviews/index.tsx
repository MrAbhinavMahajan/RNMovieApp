/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import _ from 'lodash';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  NativeAppEventEmitter,
  View,
} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {fetchMovieReviews} from '@apis/Main';
import {IconSize, MaterialIcon} from '@components/common/RNIcon';
import {FALLBACK_DATA} from '../../../data/Main';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
import {APP_QUERY_MAP} from '@constants/Api';
import {QUERY_STATUS} from '@constants/Main';
import {kREVIEWS} from '@constants/Messages';
import {COLORS} from '@constants/Colors';
import {PAGE_REFRESH} from '@constants/Page';
import {
  onWidgetLeaveEvent,
  onWidgetRefreshEvent,
  onWidgetViewEvent,
} from '~/src/analytics';
import {APP_WIDGETS_MAP} from '@constants/Navigation';
import {styles} from './styles';
import ErrorStateCard from '@components/common/ErrorState';
import EmptyStateWidget from '../EmptyState';
import RNText from '@components/common/RNText';
import HeaderTitleWidget from '../HeaderTitle';
import {WidgetEvent} from '~/src/constants/AppInterfaces';

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: null;
  rating: number;
}

interface MovieReview {
  author: string;
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  url: string;
  author_details: AuthorDetails;
}

type MoviesReviewsWidget = {
  movieId: number;
};

const MoviesReviewsWidget = ({movieId}: MoviesReviewsWidget) => {
  const queryClient = useQueryClient();
  const isFocussed = useIsFocused();
  const query = useInfiniteQuery({
    queryKey: [APP_QUERY_MAP.MOVIE_REVIEWS, movieId],
    queryFn: ({signal, pageParam}) =>
      fetchMovieReviews(signal, movieId, pageParam),
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
    hasNextPage, // ! hasNextPage becomes false when getNextPageParam returns undefined
    fetchNextPage,
    isError,
    error,
    status,
  } = query;
  const analyticsEvent: WidgetEvent = {
    widgetID: APP_WIDGETS_MAP.MOVIE_REVIEWS,
  };
  const listRef = useRef(null);
  const reviewItems = useMemo(() => {
    if (isError) {
      return [];
    }
    return data?.pages.flatMap(page => page.results) || FALLBACK_DATA;
  }, [data, isError]);

  const isEmpty =
    !isError && status !== QUERY_STATUS.PENDING && _.isEmpty(reviewItems);

  const refreshWidget = () => {
    if (isFetching) {
      return;
    }
    onWidgetRefreshEvent({
      widgetID: APP_WIDGETS_MAP.MOVIE_REVIEWS,
    });
    refetch();
  };

  const keyExtractor = (item: MovieReview) => `${item?.id}`;

  useFocusEffect(
    useCallback(() => {
      onWidgetViewEvent(analyticsEvent);
      return () => {
        onWidgetLeaveEvent(analyticsEvent);
      };
    }, []),
  );

  useEffect(() => {
    NativeAppEventEmitter.addListener(
      PAGE_REFRESH.MOVIE_DETAILS_SCREEN,
      refreshWidget,
    );
    return () => {
      // ! Cancelling Query in Progress on unmount
      queryClient.cancelQueries({queryKey: [APP_QUERY_MAP.MOVIE_REVIEWS]});
    };
  }, []);

  useEffect(() => {
    // ! Invalidate Query Data for latest movieId
    queryClient.invalidateQueries({
      queryKey: [APP_QUERY_MAP.MOVIE_REVIEWS],
      refetchType: 'active',
    });
  }, [movieId]);

  const onEndReached = () => {
    if (isFetching) {
      // ! Throttle unnecessary API Calls
      return;
    }
    if (hasNextPage) {
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
    <View
      style={styles.containerView}
      pointerEvents={isLoading ? 'none' : 'auto'}>
      <HeaderTitleWidget
        title={'Reviews'}
        containerStyles={styles.headerView}
        loaderEnabled={isFetching}
      />
      {isError && (
        <ErrorStateCard
          error={error}
          containerStyles={styles.utilsContainer}
          retryCTA={refreshWidget}
          id={APP_WIDGETS_MAP.MOVIE_REVIEWS}
          extraData={{
            cardType: 'WIDGET',
          }}
        />
      )}
      {isEmpty && (
        <EmptyStateWidget
          title={kREVIEWS.noReviews?.title}
          message={kREVIEWS.noReviews?.subtitle}
          containerStyles={styles.utilsContainer}
          icon={
            <MaterialIcon
              name={'reviews'}
              size={IconSize.large}
              color={COLORS.fullBlack}
            />
          }
        />
      )}
      <FlatList
        ref={listRef}
        data={reviewItems}
        renderItem={itemProps => <MovieReviewItem {...itemProps} />}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.scrollableContentView}
        onEndReached={onEndReached}
        ListFooterComponent={renderListFooter}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        extraData={reviewItems}
      />
    </View>
  );
};

const MovieReviewItem = ({item, index}: {item: MovieReview; index: number}) => {
  const {author, content} = item;
  const [isExpanded, setExpanded] = useState(false);

  const toggleViewMore = () => {
    setExpanded(f => !f);
  };

  return (
    <Animated.View
      key={index}
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.reviewCardView}>
      <RNText style={styles.reviewTitleText}>{author}</RNText>
      <View>
        <RNText style={styles.reviewText} numberOfLines={isExpanded ? 0 : 3}>
          {content}
        </RNText>
        <RNText style={styles.reviewCTAText} onPress={toggleViewMore}>
          {isExpanded ? 'hide' : 'view more'}
        </RNText>
      </View>
    </Animated.View>
  );
};

export default MoviesReviewsWidget;

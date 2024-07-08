import React, {useEffect, useMemo, useRef, useState} from 'react';
import _ from 'lodash';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {fetchMovieReviews} from '@apis/Main';
import {IconSize, MaterialIcon} from '@components/common/RNIcon';
import {FALLBACK_DATA} from '../../../data/Main';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
import {styles} from './styles';
import {kREVIEWS} from '@constants/Messages';
import {COLORS} from '@constants/Colors';
import {APP_QUERY_MAP} from '@constants/Api';
import {QUERY_STATUS} from '@constants/Main';
import ErrorStateWidget from '../ErrorState';
import EmptyStateWidget from '../EmptyState';
import RNText from '@components/common/RNText';

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

const MoviesReviewsWidget = () => {
  const queryClient = useQueryClient();
  const query = useInfiniteQuery({
    queryKey: [APP_QUERY_MAP.MOVIE_REVIEWS],
    queryFn: ({signal, pageParam}) => fetchMovieReviews(signal, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.page > lastPage.total_pages) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
  console.log('movieReviews:\n', query);
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
  const listRef = useRef(null);
  console.log('Review Data :\n', data);
  const reviewItems = useMemo(() => {
    if (isError) {
      return [];
    }
    return data?.pages.flatMap(page => page.results) || FALLBACK_DATA;
  }, [data, isError]);
  console.log('Review :\n', reviewItems);
  const isEmpty =
    !isError && status !== QUERY_STATUS.PENDING && _.isEmpty(reviewItems);

  const refreshWidget = () => {
    if (isFetching) {
      return;
    }
    refetch();
  };

  const keyExtractor = (item: MovieReview) => `${item?.id}`;

  useEffect(() => {
    return () => {
      // ! Cancelling Query in Progress on unmount
      queryClient.cancelQueries({queryKey: [APP_QUERY_MAP.MOVIE_REVIEWS]});
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

  const renderListFooter = () => {
    if (isFetchingNextPage) {
      return <ActivityIndicator color={STD_ACTIVITY_COLOR} />;
    }
    return <></>;
  };

  if (isError) {
    return (
      <ErrorStateWidget
        error={error}
        containerStyles={styles.utilsContainer}
        retryCTA={refreshWidget}
      />
    );
  }

  if (true || isEmpty) {
    return (
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
    );
  }

  return (
    <View style={styles.containerView}>
      {isLoading && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'large'} color={STD_ACTIVITY_COLOR} />
        </View>
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
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshWidget} />
        }
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
    <View key={index} style={styles.reviewCardView}>
      <RNText style={styles.reviewTitleText}>{author}</RNText>
      <View>
        <RNText style={styles.reviewText} numberOfLines={isExpanded ? 0 : 3}>
          {content}
        </RNText>
        <RNText style={styles.reviewCTAText} onPress={toggleViewMore}>
          {isExpanded ? 'hide' : 'view more'}
        </RNText>
      </View>
    </View>
  );
};

export default MoviesReviewsWidget;

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import _ from 'lodash';
import * as NavigationService from '@service/Navigation';
import {useQuery} from '@tanstack/react-query';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import useMovieStore from '@store/useMovieStore';
import {fetchMovieDetails, fetchRecommendedMoviesV4} from '@apis/Main';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import Animated, {FadeInRight} from 'react-native-reanimated';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '@constants/Navigation';
import {PAGE_REFRESH} from '@constants/Page';
import {FALLBACK_DATA} from '../../../data/Main';
import {QUERY_STATUS} from '@constants/Main';
import {APP_QUERY_MAP} from '@constants/Api';
import {MoviePosterItem, WidgetEvent} from '@constants/AppInterfaces';
import {getImageURL} from '@utilities/App';
import {
  onWidgetClickEvent,
  onWidgetLeaveEvent,
  onWidgetRefreshEvent,
  onWidgetViewEvent,
} from '~/src/analytics';
import {styles} from './styles';
import HeaderTitleWidget from '../HeaderTitle';
import MoviePosterWidget from '../MoviePoster';
import ErrorStateCard from '@components/common/ErrorState';

const RecommendedMoviesWidget = () => {
  const isFocussed = useIsFocused();
  const widgetTitle = 'Recommended Movies';
  const lastWatchedMovieId = useMovieStore(state => state.lastWatchedMovieId);
  const page = 1;
  const recommendedMoviesQuery = useQuery({
    queryKey: [APP_QUERY_MAP.RECOMMENDED_MOVIES, lastWatchedMovieId],
    queryFn: ({signal}) => fetchRecommendedMoviesV4(signal, page),
    enabled: isFocussed,
  });
  const lastWatchedMovieDetailsQuery = useQuery({
    queryKey: [APP_QUERY_MAP.RECOMMENDED_MOVIES, lastWatchedMovieId, 'Details'],
    queryFn: ({signal}) => fetchMovieDetails(signal, lastWatchedMovieId || 1),
    enabled: isFocussed && lastWatchedMovieId !== null,
  });

  const {data, refetch, isLoading, isFetching, isError, error, status} =
    recommendedMoviesQuery;
  const {data: lastWatchedMovieDetails} = lastWatchedMovieDetailsQuery;
  const analyticsEvent: WidgetEvent = {
    widgetID: APP_WIDGETS_MAP.RECOMMENDED_MOVIES,
  };
  const listRef = useRef(null);
  const movies = useMemo(() => {
    if (isError) {
      return [];
    }
    return data?.results || FALLBACK_DATA;
  }, [data?.results, isError]);
  const [isRightCTAEnabled, setRightCTAEnabled] = useState(false);

  const refreshWidget = () => {
    if (isFetching) {
      return;
    }
    onWidgetRefreshEvent({
      widgetID: APP_WIDGETS_MAP.RECOMMENDED_MOVIES,
    });
    refetch();
  };

  const onViewAllAction = () => {
    onWidgetClickEvent({
      widgetID: APP_WIDGETS_MAP.RECOMMENDED_MOVIES,
      name: 'VIEW ALL MOVIES CTA',
    });
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_VIEW_ALL_SCREEN, {
      queryParams: {
        screenTitle: widgetTitle,
        widgetId: APP_WIDGETS_MAP.RECOMMENDED_MOVIES,
      },
    });
  };

  const onScroll = (event: any) => {
    const listScrollPos = event?.nativeEvent?.contentOffset?.x || 0;
    setRightCTAEnabled(listScrollPos > 120);
  };

  const keyExtractor = (item: MoviePosterItem) => `${item?.id}`;

  useFocusEffect(
    useCallback(() => {
      onWidgetViewEvent(analyticsEvent);
      return () => {
        onWidgetLeaveEvent(analyticsEvent);
      };
    }, []),
  );

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);

  if (!isError && status !== QUERY_STATUS.PENDING && _.isEmpty(movies)) {
    return <></>;
  }

  return (
    <View
      style={styles.containerView}
      pointerEvents={isLoading ? 'none' : 'auto'}>
      <HeaderTitleWidget
        title={widgetTitle}
        meta={{
          title: lastWatchedMovieDetails?.title,
          subtitle: 'Because You Watched',
          imageURL: getImageURL(lastWatchedMovieDetails?.poster_path),
        }}
        hasMetaData={!_.isEmpty(lastWatchedMovieDetails)}
        containerStyles={styles.headerView}
        rightCTAAction={onViewAllAction}
        rightCTAEnabled={isRightCTAEnabled}
        loaderEnabled={isFetching}
      />
      {isError && (
        <ErrorStateCard
          error={error}
          containerStyles={styles.errorContainer}
          retryCTA={refreshWidget}
          id={APP_WIDGETS_MAP.RECOMMENDED_MOVIES}
          extraData={{
            cardType: 'WIDGET',
          }}
        />
      )}
      <FlatList
        ref={listRef}
        data={movies}
        renderItem={({item, index}: {item: MoviePosterItem; index: number}) => (
          <MovieCard item={item} index={index} />
        )}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        contentContainerStyle={styles.scrollableContentView}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        extraData={movies}
      />
    </View>
  );
};

const MovieCard = ({item, index}: {item: MoviePosterItem; index: number}) => {
  const {title, id} = item || {};
  const onCTA = () => {
    onWidgetClickEvent({
      widgetID: APP_WIDGETS_MAP.RECOMMENDED_MOVIES,
      name: 'MOVIE POSTER CTA',
      extraData: {
        ...item,
      },
    });
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
      queryParams: {screenTitle: title, movieId: id},
    });
  };
  return (
    <Animated.View entering={FadeInRight}>
      <MoviePosterWidget
        item={item}
        index={index}
        containerStyles={styles.moviePoster}
        action={onCTA}
      />
    </Animated.View>
  );
};

export default RecommendedMoviesWidget;

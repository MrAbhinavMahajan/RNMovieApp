/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';
import * as NavigationService from '@service/Navigation';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import Animated, {FadeInRight} from 'react-native-reanimated';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {PAGE_REFRESH} from '@constants/Page';
import {fetchUpcomingMovies} from '@apis/Main';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '@constants/Navigation';
import {FALLBACK_DATA} from '../../../data/Main';
import {QUERY_STATUS} from '@constants/Main';
import {APP_QUERY_MAP} from '@constants/Api';
import {MoviePosterItem, WidgetEvent} from '@constants/AppInterfaces';
import {
  onWidgetClickEvent,
  onWidgetLeaveEvent,
  onWidgetRefreshEvent,
  onWidgetViewEvent,
} from '~/src/analytics';
import {styles} from './styles';
import MoviePosterWidget from '../MoviePoster';
import HeaderTitleWidget from '../HeaderTitle';
import ErrorStateCard from '@components/common/ErrorState';

const UpcomingMoviesWidget = () => {
  const isFocussed = useIsFocused();
  const widgetTitle = 'Upcoming Movies';
  const page = 1;
  const query = useQuery({
    queryKey: [APP_QUERY_MAP.UPCOMING_MOVIES],
    queryFn: ({signal}) => fetchUpcomingMovies(signal, page),
    enabled: isFocussed,
  });
  const {data, refetch, isLoading, isFetching, isError, error, status} = query;
  const analyticsEvent: WidgetEvent = {
    widgetID: APP_WIDGETS_MAP.UPCOMING_MOVIES,
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
      widgetID: APP_WIDGETS_MAP.UPCOMING_MOVIES,
    });
    refetch();
  };

  const onViewAllAction = () => {
    onWidgetClickEvent({
      widgetID: APP_WIDGETS_MAP.UPCOMING_MOVIES,
      name: 'VIEW ALL MOVIES CTA',
    });
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_VIEW_ALL_SCREEN, {
      queryParams: {
        screenTitle: widgetTitle,
        widgetId: APP_WIDGETS_MAP.UPCOMING_MOVIES,
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
          id={APP_WIDGETS_MAP.UPCOMING_MOVIES}
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
      widgetID: APP_WIDGETS_MAP.UPCOMING_MOVIES,
      name: 'MOVIE POSTER CTA',
      extraData: {
        ...item,
      },
    });
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
      queryParams: {movieName: title, movieId: id},
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

export default UpcomingMoviesWidget;

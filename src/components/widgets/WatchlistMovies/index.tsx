/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';
import * as NavigationService from '@service/Navigation';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {fetchMovieWatchlist} from '@apis/Main';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '@constants/Navigation';
import {PAGE_REFRESH} from '@constants/Page';
import {FALLBACK_DATA} from '../../../data/Main';
import {QUERY_STATUS} from '@constants/Main';
import {kWATCHLIST} from '@constants/Messages';
import {IconSize, MaterialIcon} from '@components/common/RNIcon';
import {COLORS} from '@constants/Colors';
import {APP_QUERY_MAP} from '@constants/Api';
import {MoviePosterItem, WidgetEvent} from '@constants/AppInterfaces';
import {
  onWidgetClickEvent,
  onWidgetLeaveEvent,
  onWidgetRefreshEvent,
  onWidgetViewEvent,
} from '~/src/analytics';
import {styles} from './styles';
import HeaderTitleWidget from '../HeaderTitle';
import MoviePosterWidget from '../MoviePoster';
import EmptyStateWidget from '../EmptyState';
import ErrorStateCard from '@components/common/ErrorState';

const WatchlistMoviesWidget = () => {
  const isFocussed = useIsFocused();
  const widgetTitle = 'Watchlist';
  const page = 1;
  const query = useQuery({
    queryKey: [APP_QUERY_MAP.WATCHLIST_MOVIES],
    queryFn: ({signal}) => fetchMovieWatchlist(signal, page),
    enabled: isFocussed,
  });
  const {data, refetch, isLoading, isFetching, isError, error, status} = query;
  const listRef = useRef(null);
  const analyticsEvent: WidgetEvent = {
    widgetID: APP_WIDGETS_MAP.WATCHLIST_MOVIES,
  };
  const movies = useMemo(() => {
    if (isError) {
      return [];
    }
    return data?.results || FALLBACK_DATA;
  }, [data?.results, isError]);
  const isEmpty =
    !isError && status !== QUERY_STATUS.PENDING && _.isEmpty(movies);
  const refreshWidget = () => {
    if (isFetching) {
      return;
    }
    onWidgetRefreshEvent({
      widgetID: APP_WIDGETS_MAP.WATCHLIST_MOVIES,
    });
    refetch();
  };

  const exploreMovies = () => {
    onWidgetClickEvent({
      widgetID: APP_WIDGETS_MAP.WATCHLIST_MOVIES,
      name: 'EXPLORE MOVIES CTA',
    });
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_VIEW_ALL_SCREEN, {
      queryParams: {
        screenTitle: 'Now Playing Movies',
        widgetId: APP_WIDGETS_MAP.NOW_PLAYING,
      },
    });
  };

  const onViewAllAction = () => {
    onWidgetClickEvent({
      widgetID: APP_WIDGETS_MAP.WATCHLIST_MOVIES,
      name: 'VIEW ALL MOVIES CTA',
    });
    NavigationService.navigate(APP_PAGES_MAP.PROFILE_VIEW_ALL_SCREEN, {
      queryParams: {
        screenTitle: widgetTitle,
        widgetId: APP_WIDGETS_MAP.WATCHLIST_MOVIES,
      },
    });
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
    NativeAppEventEmitter.addListener(
      PAGE_REFRESH.PROFILE_SCREEN,
      refreshWidget,
    );
  }, []);

  return (
    <View
      style={styles.containerView}
      pointerEvents={isLoading ? 'none' : 'auto'}>
      <HeaderTitleWidget
        title={widgetTitle}
        containerStyles={styles.headerView}
        rightCTAAction={onViewAllAction}
        rightCTAEnabled={movies?.length > 0}
        loaderEnabled={isFetching}
      />
      {isError && (
        <ErrorStateCard
          error={error}
          containerStyles={styles.errorContainer}
          retryCTA={refreshWidget}
          id={APP_WIDGETS_MAP.WATCHLIST_MOVIES}
          extraData={{
            cardType: 'WIDGET',
          }}
        />
      )}
      {isEmpty && (
        <EmptyStateWidget
          title={kWATCHLIST.noWatchlist.title}
          message={kWATCHLIST.noWatchlist.subtitle}
          containerStyles={styles.errorContainer}
          action={exploreMovies}
          icon={
            <MaterialIcon
              name={'bookmark'}
              size={IconSize.large}
              color={COLORS.fullBlack}
            />
          }
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
      widgetID: APP_WIDGETS_MAP.WATCHLIST_MOVIES,
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
    <Animated.View entering={FadeInLeft}>
      <MoviePosterWidget
        item={item}
        index={index}
        containerStyles={styles.moviePoster}
        action={onCTA}
      />
    </Animated.View>
  );
};
export default WatchlistMoviesWidget;

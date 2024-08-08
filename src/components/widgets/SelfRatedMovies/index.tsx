/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useRef} from 'react';
import _ from 'lodash';
import * as NavigationService from '@service/Navigation';
import {useQuery} from '@tanstack/react-query';
import {useIsFocused} from '@react-navigation/native';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {fetchMoviesRated} from '@apis/Main';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '@constants/Navigation';
import {styles} from './styles';
import {PAGE_REFRESH} from '@constants/Page';
import {FALLBACK_DATA} from '../../../data/Main';
import {QUERY_STATUS} from '@constants/Main';
import {kRATINGS} from '@constants/Messages';
import {IconSize, MaterialIcon} from '@components/common/RNIcon';
import {COLORS} from '@constants/Colors';
import {APP_QUERY_MAP} from '@constants/Api';
import {MoviePosterItem} from '@constants/AppInterfaces';
import {onWidgetClickEvent, onWidgetRefreshEvent} from '~/src/analytics';
import HeaderTitleWidget from '../HeaderTitle';
import MoviePosterWidget from '../MoviePoster';
import ErrorStateWidget from '../ErrorState';
import EmptyStateWidget from '../EmptyState';

const SelfRatedMoviesWidget = () => {
  const isFocussed = useIsFocused();
  const page = 1;
  const query = useQuery({
    queryKey: [APP_QUERY_MAP.SELF_RATED_MOVIES],
    queryFn: ({signal}) => fetchMoviesRated(signal, page),
    refetchInterval: 5000,
    enabled: isFocussed,
  });
  const {data, refetch, isLoading, isFetching, isError, error, status} = query;
  const listRef = useRef(null);
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
      widgetID: APP_WIDGETS_MAP.SELF_RATED_MOVIES,
    });
    refetch();
  };

  const exploreMovies = () => {
    onWidgetClickEvent({
      widgetID: APP_WIDGETS_MAP.SELF_RATED_MOVIES,
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
      widgetID: APP_WIDGETS_MAP.SELF_RATED_MOVIES,
      name: 'VIEW ALL MOVIES CTA',
    });
    NavigationService.navigate(APP_PAGES_MAP.PROFILE_VIEW_ALL_SCREEN, {
      queryParams: {
        screenTitle: 'Rated Movies',
        widgetId: APP_WIDGETS_MAP.SELF_RATED_MOVIES,
      },
    });
  };

  const keyExtractor = (item: MoviePosterItem) => `${item?.id}`;

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
        title={'Rated Movies'}
        containerStyles={styles.headerView}
        rightCTAAction={onViewAllAction}
        rightCTAEnabled={movies?.length > 0}
        loaderEnabled={isLoading}
      />
      {isError && (
        <ErrorStateWidget
          error={error}
          containerStyles={styles.errorContainer}
          retryCTA={refreshWidget}
        />
      )}
      {isEmpty && (
        <EmptyStateWidget
          title={kRATINGS.noRatings.title}
          message={kRATINGS.noRatings.subtitle}
          containerStyles={styles.errorContainer}
          action={exploreMovies}
          icon={
            <MaterialIcon
              name={'star'}
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
      widgetID: APP_WIDGETS_MAP.SELF_RATED_MOVIES,
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
export default SelfRatedMoviesWidget;

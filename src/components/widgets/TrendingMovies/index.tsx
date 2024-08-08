/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo} from 'react';
import _ from 'lodash';
import {ActivityIndicator, NativeAppEventEmitter, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import * as NavigationService from '@service/Navigation';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '@constants/Navigation';
import {onWidgetClickEvent, onWidgetRefreshEvent} from '~/src/analytics';
import {PAGE_REFRESH} from '@constants/Page';
import {fetchTrendingMovies} from '@apis/Main';
import {QUERY_STATUS} from '@constants/Main';
import {APP_QUERY_MAP} from '@constants/Api';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
import {MovieCarouselTypes, MovieItem} from '@constants/AppInterfaces';
import {FALLBACK_DATA} from '../../../data/Main';
import {styles} from './styles';
import ErrorStateWidget from '../ErrorState';
import MovieCarousel from '@components/common/MovieCarousel';

const TrendingMoviesWidget = () => {
  const isFocussed = useIsFocused();
  const insets = useSafeAreaInsets();
  const query = useQuery({
    queryKey: [APP_QUERY_MAP.TRENDING_MOVIES],
    queryFn: ({signal}) => fetchTrendingMovies(signal),
    enabled: isFocussed,
  });
  const {data, refetch, isLoading, isFetching, isError, error, status} = query;
  const movies = useMemo(() => {
    if (isError) {
      return [];
    }
    return data?.results || FALLBACK_DATA;
  }, [data?.results, isError]);

  const refreshWidget = () => {
    if (isFetching) {
      return;
    }
    onWidgetRefreshEvent({
      widgetID: APP_WIDGETS_MAP.TRENDING_MOVIES,
    });
    refetch();
  };

  const onMovieCarouselItemCTA = (item: MovieItem) => {
    const {title, id} = item;
    onWidgetClickEvent({
      widgetID: APP_WIDGETS_MAP.TRENDING_MOVIES,
      name: 'MOVIE POSTER CTA',
      extraData: {
        ...item,
      },
    });
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
      queryParams: {screenTitle: title, movieId: id},
    });
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);

  if (!isError && status !== QUERY_STATUS.PENDING && _.isEmpty(movies)) {
    return <View style={[styles.noDataView, {paddingTop: insets.top}]} />;
  }

  return (
    <View
      style={styles.containerView}
      pointerEvents={isFetching ? 'none' : 'auto'}>
      {isLoading && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'large'} color={STD_ACTIVITY_COLOR} />
        </View>
      )}
      {isError && (
        <ErrorStateWidget
          error={error}
          containerStyles={[styles.errorContainer, {marginTop: insets.top}]}
          retryCTA={refreshWidget}
        />
      )}
      <MovieCarousel
        carouselType={MovieCarouselTypes.BANNER}
        data={movies}
        itemAction={onMovieCarouselItemCTA}
        autoPlay
      />
    </View>
  );
};

export default TrendingMoviesWidget;

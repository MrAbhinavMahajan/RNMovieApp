import React, {useEffect, useMemo, useRef} from 'react';
import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';
import * as NavigationService from '../../../service/Navigation';
import Carousel from 'react-native-snap-carousel';
import {ActivityIndicator, NativeAppEventEmitter, View} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import {fetchTrendingMovies} from '@apis/Main';
import {styles} from './styles';
import {FALLBACK_DATA} from '../../../data/Main';
import {QUERY_STATUS} from '../../../constants/Main';
import {SCREEN_WIDTH} from '../../../utilities/App';
import {COLORS} from '../../../constants/Colors';
import {APP_PAGES_MAP} from '../../../constants/Navigation';
import {APP_QUERY_MAP} from '../../../constants/Api';
import {MoviePosterItem} from '../../../constants/AppInterfaces';
import MoviePosterWidget from '../MoviePoster';
import ErrorStateWidget from '../ErrorState';

const SLIDER_WIDTH = SCREEN_WIDTH;
const ITEM_WIDTH = SCREEN_WIDTH * 0.6;
const TrendingMoviesWidget = () => {
  const query = useQuery({
    queryKey: [APP_QUERY_MAP.TRENDING_MOVIES],
    queryFn: ({signal}) => fetchTrendingMovies(signal),
  });
  console.log('trendingMovies:\n', query);
  const {data, refetch, isLoading, isFetching, isError, error, status} = query;
  const carouselRef = useRef(null);
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
    refetch();
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);

  if (!isError && status !== QUERY_STATUS.PENDING && _.isEmpty(movies)) {
    return <></>;
  }

  return (
    <View
      style={styles.containerView}
      pointerEvents={isFetching ? 'none' : 'auto'}>
      {isLoading && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'large'} color={COLORS.azureishWhite} />
        </View>
      )}
      {isError && (
        <ErrorStateWidget
          error={error}
          containerStyles={styles.errorContainer}
          retryCTA={refreshWidget}
        />
      )}
      <Carousel
        ref={carouselRef}
        layoutCardOffset={9}
        loop
        autoplay
        autoplayInterval={1500}
        data={movies}
        renderItem={({item, index}: {item: MoviePosterItem; index: number}) => (
          <MovieCard item={item} index={index} />
        )}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
      />
    </View>
  );
};

const MovieCard = ({item, index}: {item: MoviePosterItem; index: number}) => {
  const {title, id} = item || {};
  const onCTA = () => {
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_DETAILS_SCREEN, {
      queryParams: {screenTitle: title, movieId: id},
    });
  };
  return (
    <MoviePosterWidget
      item={item}
      index={index}
      containerStyles={styles.moviePoster}
      action={onCTA}
    />
  );
};

export default TrendingMoviesWidget;

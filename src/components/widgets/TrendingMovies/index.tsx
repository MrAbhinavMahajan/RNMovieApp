import React, {useEffect, useMemo, useRef} from 'react';
import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';
import Carousel from 'react-native-snap-carousel';
import {ActivityIndicator, NativeAppEventEmitter, View} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import {fetchTrendingMovies} from '../../../apis/Main';
import {styles} from './styles';
import {FALLBACK_DATA} from '../../../data/Main';
import {QUERY_STATUS} from '../../../constants/Main';
import MoviePosterWidget, {MoviePosterItem} from '../MoviePoster';
import ErrorInfoWidget from '../ErrorInfo';
import {SCREEN_WIDTH} from '../../../utilities/App';

const SLIDER_WIDTH = SCREEN_WIDTH;
const ITEM_WIDTH = SCREEN_WIDTH * 0.6;
const TrendingMoviesWidget = () => {
  const query = useQuery({
    queryKey: ['trendingMovies'],
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
      {isLoading && <ActivityIndicator />}
      {isError && (
        <ErrorInfoWidget
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

const MovieCard = ({item, index}: {item: MoviePosterItem; index: number}) => (
  <MoviePosterWidget
    item={item}
    index={index}
    containerStyles={styles.moviePoster}
  />
);

export default TrendingMoviesWidget;

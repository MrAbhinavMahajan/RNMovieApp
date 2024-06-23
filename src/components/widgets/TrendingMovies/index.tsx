import React, {useEffect, useRef} from 'react';
import {NativeAppEventEmitter, View} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchTrendingMovies} from '../../../apis/Main';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {SCREEN_WIDTH} from '../../../utilities/AppUtils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {STD_VERTICAL_SPACING} from '../../../constants/Styles';
import {styles} from './styles';
import MoviePosterWidget from '../MoviePoster';
import {hpx, vpx} from '../../../libraries/responsive-pixels';

const POSTER_HEIGHT = vpx(300);

const TrendingMoviesWidget = () => {
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const query = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: fetchTrendingMovies,
  });
  console.log('trendingMovies: \n', query);
  const {data, error, isLoading, isSuccess, refetch} = query;

  const carouselRef = useRef<ICarouselInstance>(null);
  const baseOptions = {
    vertical: false,
    width: SCREEN_WIDTH / 2,
    height: POSTER_HEIGHT,
  };

  const refreshWidget = () => {
    refetch();
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);

  return (
    <View
      style={[
        styles.containerView,
        {paddingTop: insets.top + STD_VERTICAL_SPACING},
      ]}>
      <Carousel
        ref={carouselRef}
        {...baseOptions}
        style={{
          width: SCREEN_WIDTH,
        }}
        loop
        pagingEnabled={true}
        snapEnabled={true}
        autoPlay={true}
        autoPlayInterval={1500}
        mode={'parallax'}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: hpx(30),
        }}
        data={data?.results}
        renderItem={itemProps => (
          <MoviePosterWidget
            {...itemProps}
            containerStyles={{
              height: POSTER_HEIGHT,
              borderWidth: 0,
            }}
          />
        )}
      />
    </View>
  );
};

export default TrendingMoviesWidget;

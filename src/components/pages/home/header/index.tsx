import React, {useEffect, useRef} from 'react';
import {NativeAppEventEmitter} from 'react-native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {SCREEN_WIDTH} from '../../../../utilities/AppUtils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {STD_VERTICAL_SPACING} from '../../../../constants/Styles';
import {styles} from './styles';
import {hpx, vpx} from '../../../../libraries/responsive-pixels';
import {COLORS} from '../../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {PAGE_REFRESH} from '../../../../constants/Page';
import {fetchTrendingMovies} from '../../../../apis/Main';
import MoviePosterWidget, {MoviePosterItem} from '../../../widgets/MoviePoster';

const POSTER_HEIGHT = vpx(300);

const HomeScreenHeader = () => {
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
    <LinearGradient
      colors={[COLORS.transparent, COLORS.fullBlack]}
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
        renderItem={({item, index}: {item: MoviePosterItem; index: number}) => (
          <MoviePosterWidget
            item={item}
            index={index}
            containerStyles={[
              styles.moviePoster,
              {
                height: POSTER_HEIGHT,
              },
            ]}
          />
        )}
      />
    </LinearGradient>
  );
};

export default HomeScreenHeader;

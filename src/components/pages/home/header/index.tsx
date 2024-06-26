import React, {useEffect, useRef} from 'react';
import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';
import {ActivityIndicator, NativeAppEventEmitter, View} from 'react-native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PAGE_REFRESH} from '../../../../constants/Page';
import {hpx, vpx} from '../../../../libraries/responsive-pixels';
import {SCREEN_WIDTH} from '../../../../utilities/AppUtils';
import {fetchTrendingMovies} from '../../../../apis/Main';
import {STD_VERTICAL_SPACING} from '../../../../constants/Styles';
import {COLORS} from '../../../../constants/Colors';
import {FALLBACK_DATA} from '../../../data/Main';
import {styles} from './styles';
import MoviePosterWidget, {MoviePosterItem} from '../../../widgets/MoviePoster';
import ErrorInfoWidget from '../../../widgets/ErrorInfo';

const POSTER_HEIGHT = vpx(300);

const HomeScreenHeader = () => {
  const insets = useSafeAreaInsets();
  const query = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: ({signal}) => fetchTrendingMovies(signal),
  });
  console.log('trendingMovies: \n', query);
  const {data, refetch, isLoading, isError, error} = query;

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
      pointerEvents={isLoading ? 'none' : 'auto'}
      colors={[COLORS.transparent, COLORS.fullBlack]}
      style={[
        styles.containerView,
        {paddingTop: insets.top + STD_VERTICAL_SPACING},
      ]}>
      {isLoading && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'large'} color={COLORS.antiFlashWhite} />
        </View>
      )}
      {isError && (
        <ErrorInfoWidget
          error={error}
          containerStyles={styles.errorContainer}
          retryCTA={refreshWidget}
        />
      )}
      {!_.isEmpty(data?.results) && (
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
          data={data?.results ?? FALLBACK_DATA}
          renderItem={({
            item,
            index,
          }: {
            item: MoviePosterItem;
            index: number;
          }) => (
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
      )}
    </LinearGradient>
  );
};

export default HomeScreenHeader;

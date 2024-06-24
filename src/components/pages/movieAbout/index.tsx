/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {styles} from './styles';
import NowPlayingMoviesWidget from '../../widgets/NowPlaying';
import UpcomingMoviesWidget from '../../widgets/UpcomingMovies';
import TopRatedMoviesWidget from '../../widgets/TopRatedMovies';
import RecommendedMoviesWidget from '../../widgets/RecommendedMovies';
import QuotationWidget from '../../widgets/Quotation';
import {PAGE_REFRESH} from '../../../constants/Page';

interface MovieAboutScreenProps {
  route: {
    params: {
      queryParams: {
        screenTitle: string;
      };
    };
  };
}

const MovieAboutScreen = (props: MovieAboutScreenProps) => {
  const scrollRef = useRef(null);
  const {queryParams} = props.route?.params;
  const {screenTitle} = queryParams;

  const onPageRefresh = () => {};

  useEffect(() => {
    NativeAppEventEmitter.addListener(
      PAGE_REFRESH.MOVIE_DETAILS_SCREEN,
      onPageRefresh,
    );
  }, []);

  return (
    <View style={styles.screenView}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.screenScrollableView}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        <NowPlayingMoviesWidget />
        <UpcomingMoviesWidget />
        <TopRatedMoviesWidget />
        <RecommendedMoviesWidget />
        <QuotationWidget
          title={`Live${'\n'}it up!`}
          subtitle={'Crafted with ❤️ in Chamba, India'}
        />
      </ScrollView>
    </View>
  );
};

export default MovieAboutScreen;

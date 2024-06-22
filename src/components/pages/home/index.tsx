/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {styles} from './styles';
import {ScrollToTopCTA} from '../../common/AppCTA';
import TrendingMoviesWidget from '../../widgets/TrendingMovies';
import UpcomingMoviesWidget from '../../widgets/UpcomingMovies';
import TopRatedMoviesWidget from '../../widgets/TopRatedMovies';
import NowPlayingMoviesWidget from '../../widgets/NowPlaying';
import QuotationWidget from '../../widgets/Quotation';
import {PAGE_REFRESH} from '../../../constants/Page';
import RecommendedMoviesWidget from '../../widgets/RecommendedMovies';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {STD_VERTICAL_SPACING} from '../../../constants/Styles';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);

  useEffect(() => {
    return () => {
      NativeAppEventEmitter.removeAllListeners(PAGE_REFRESH.HOME_SCREEN);
    };
  }, []);

  const onPageRefresh = () => {
    NativeAppEventEmitter.emit(PAGE_REFRESH.HOME_SCREEN);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  return (
    <View style={styles.screenView}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[
          styles.screenScrollableView,
          {paddingTop: insets.top + STD_VERTICAL_SPACING},
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        <TrendingMoviesWidget />
        <NowPlayingMoviesWidget />
        <UpcomingMoviesWidget />
        <TopRatedMoviesWidget />
        <RecommendedMoviesWidget />
        <QuotationWidget
          title={`Live${'\n'}it up!`}
          subtitle={'Crafted with ❤️ in Chamba, India'}
        />
      </ScrollView>
      <ScrollToTopCTA
        scrollToTop={scrollToTop}
        styles={[styles.scrollToTopBtn]}
      />
    </View>
  );
};

export default HomeScreen;

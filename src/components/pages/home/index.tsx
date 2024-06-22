/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {ShadowedView} from 'react-native-fast-shadow';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';
import RNImage from '../../common/RNImage';
import AppCTA, {ScrollToTopCTA} from '../../common/AppCTA';
import TrendingMoviesWidget from '../../widgets/TrendingMovies';
import UpcomingMoviesWidget from '../../widgets/UpcomingMovies';
import TopRatedMoviesWidget from '../../widgets/TopRatedMovies';
import NowPlayingMoviesWidget from '../../widgets/NowPlaying';
import QuotationWidget from '../../widgets/Quotation';
import {PAGE_REFRESH} from '../../../constants/Page';
import RecommendedMoviesWidget from '../../widgets/RecommendedMovies';
import {PROFILE_IMAGE} from '../../../constants/Assets';

const HomeScreen = () => {
  const scrollRef = useRef(null);
  const openHamburger = () => {};

  useEffect(() => {
    return () => {
      NativeAppEventEmitter.removeAllListeners(PAGE_REFRESH.HOME_SCREEN);
    };
  }, []);

  const onPageRefresh = () => {
    // Emit HomePage Refresh Event
    NativeAppEventEmitter.emit(PAGE_REFRESH.HOME_SCREEN);
  };

  const headerLeftCTA = () => {
    return (
      <ShadowedView style={styles.headerLeftCTAShadow}>
        <View style={styles.headerLeftCTA}>
          <AppCTA onPress={openHamburger}>
            <RNImage
              imageURL={PROFILE_IMAGE}
              imageViewStyles={styles.headerLeftCTAImage}
            />
          </AppCTA>
        </View>
      </ShadowedView>
    );
  };

  return (
    <View style={styles.screenView}>
      <AppHeader LeftComponent={headerLeftCTA()} title="Show Time" />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.screenScrollableView}
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
      <ScrollToTopCTA scrollRef={scrollRef} styles={[styles.scrollToTopBtn]} />
    </View>
  );
};

export default HomeScreen;

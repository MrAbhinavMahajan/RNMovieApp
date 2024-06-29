/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {styles} from './styles';
import UpcomingMoviesWidget from '../../widgets/UpcomingMovies';
import TopRatedMoviesWidget from '../../widgets/TopRatedMovies';
import NowPlayingMoviesWidget from '../../widgets/NowPlaying';
import QuotationWidget from '../../widgets/Quotation';
import {PAGE_REFRESH} from '../../../constants/Page';
import RecommendedMoviesWidget from '../../widgets/RecommendedMovies';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from 'react-native-reanimated';
import {AppArrowUpIcon} from '../../common/RNIcon';
import AppCTA from '../../common/AppCTA';
import HomeScreenHeader from './header';

const HomeScreen = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(scrollRef); // * Gives Current offset of ScrollView

  useEffect(() => {
    NativeAppEventEmitter.emit(PAGE_REFRESH.PROFILE_SCREEN);
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

  const scrollToTopCTAFadeAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 600 ? 1 : 0),
  }));

  return (
    <View style={styles.screenView}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.screenScrollableView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        <HomeScreenHeader />
        <NowPlayingMoviesWidget />
        <TopRatedMoviesWidget />
        <UpcomingMoviesWidget />
        <RecommendedMoviesWidget />
        <QuotationWidget
          title={`Live${'\n'}it up!`}
          subtitle={'Crafted with ❤️ in Chamba, India'}
        />
      </ScrollView>

      <Animated.View
        style={[styles.scrollToTopBtn, scrollToTopCTAFadeAnimationStyles]}>
        <AppCTA hitSlop={styles.scrollToTopBtnHitSlop} onPress={scrollToTop}>
          <AppArrowUpIcon />
        </AppCTA>
      </Animated.View>
    </View>
  );
};

export default HomeScreen;

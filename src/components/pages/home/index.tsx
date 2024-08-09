/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {PAGE_REFRESH} from '@constants/Page';
import {AppArrowUpIcon} from '@components/common/RNIcon';
import {APP_PAGES_MAP} from '@constants/Navigation';
import {PageEvent} from '@constants/AppInterfaces';
import {
  onPageClickEvent,
  onPageLeaveEvent,
  onPageRefreshEvent,
  onPageViewEvent,
} from '~/src/analytics';
import {styles} from './styles';
import UpcomingMoviesWidget from '@components/widgets/UpcomingMovies';
import TopRatedMoviesWidget from '@components/widgets/TopRatedMovies';
import NowPlayingMoviesWidget from '@components/widgets/NowPlaying';
import QuotationWidget from '@components/widgets/Quotation';
import RecommendedMoviesWidget from '@components/widgets/RecommendedMovies';
import AppCTA from '@components/common/AppCTA';
import MovieGenresSetter from '@components/others/MovieGenresSetter';
import TrendingMoviesWidget from '@components/widgets/TrendingMovies';

const HomeScreen = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(scrollRef); // * Gives Current offset of ScrollView
  const analyticsEvent: PageEvent = {
    pageID: APP_PAGES_MAP.HOME_SCREEN,
  };

  useFocusEffect(
    useCallback(() => {
      onPageViewEvent(analyticsEvent);
      return () => {
        onPageLeaveEvent(analyticsEvent);
      };
    }, []),
  );

  useEffect(() => {
    return () => {
      NativeAppEventEmitter.removeAllListeners(PAGE_REFRESH.HOME_SCREEN);
    };
  }, []);

  const refreshPage = () => {
    onPageRefreshEvent({
      pageID: APP_PAGES_MAP.HOME_SCREEN,
    });
    NativeAppEventEmitter.emit(PAGE_REFRESH.HOME_SCREEN);
  };

  const scrollToTop = () => {
    onPageClickEvent({
      pageID: APP_PAGES_MAP.HOME_SCREEN,
      name: 'SCROLL TO TOP',
    });
    scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  const scrollToTopCTAAnimationStyles = useAnimatedStyle(() => ({
    opacity: withTiming(scrollHandler.value > 600 ? 1 : 0),
    transform: [
      {
        translateY: withRepeat(
          withSequence(withTiming(-15), withTiming(0)),
          -1,
          true,
        ),
      },
    ],
  }));

  return (
    <View style={styles.screenView}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.screenScrollableView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshPage} />
        }>
        <TrendingMoviesWidget />
        <NowPlayingMoviesWidget />
        <UpcomingMoviesWidget />
        <RecommendedMoviesWidget />
        <TopRatedMoviesWidget />
        <QuotationWidget
          title={`Live${'\n'}it up!`}
          subtitle={'Crafted with ❤️ in Chamba, India'}
        />
      </ScrollView>

      <Animated.View
        style={[styles.scrollToTopBtn, scrollToTopCTAAnimationStyles]}>
        <AppCTA hitSlop={styles.scrollToTopBtnHitSlop} onPress={scrollToTop}>
          <AppArrowUpIcon />
        </AppCTA>
      </Animated.View>

      <MovieGenresSetter />
    </View>
  );
};

export default HomeScreen;

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import useMovieStore from '@store/useMovieStore';
import {useFocusEffect} from '@react-navigation/native';
import {PAGE_REFRESH} from '@constants/Page';
import {
  onPageLeaveEvent,
  onPageRefreshEvent,
  onPageViewEvent,
} from '~/src/analytics';
import * as NavigationService from '@service/Navigation';
import {APP_PAGES_MAP} from '~/src/constants/Navigation';
import {PageEvent} from '@constants/AppInterfaces';
import {PrimaryCTA} from '@components/common/AppCTA';
import {styles} from './styles';
import AppHeader from '@components/common/AppHeader';
import DetailsBox from './DetailsBox';
import PlayerBox from './PlayerBox';
import CTAsPanelBox from './CTAsPanelBox';
import SimilarMoviesWidget from '@components/widgets/SimilarMovies';
import MoviesReviewsWidget from '@components/widgets/MovieReviews';

interface MovieDetailsScreenProps {
  route: {
    params: {
      queryParams: {
        screenTitle: string;
        movieId: number;
      };
    };
  };
}

const MovieDetailsScreen = (props: MovieDetailsScreenProps) => {
  const setLastWatchedMovieId = useMovieStore(
    state => state.setLastWatchedMovieId,
  );
  const scrollRef = useRef(null);
  const {queryParams} = props.route?.params || {};
  const {screenTitle, movieId} = queryParams;
  const analyticsEvent: PageEvent = {
    pageID: APP_PAGES_MAP.MOVIE_DETAILS_SCREEN,
    extraData: {
      ...queryParams,
    },
  };
  const refreshPage = () => {
    onPageRefreshEvent({
      pageID: APP_PAGES_MAP.MOVIE_DETAILS_SCREEN,
    });
    NativeAppEventEmitter.emit(PAGE_REFRESH.MOVIE_DETAILS_SCREEN);
  };

  const onBookCTA = () => {
    NavigationService.navigate(APP_PAGES_MAP.TICKET_BOOKING_SCREEN, {
      queryParams,
    });
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
    setLastWatchedMovieId(movieId);
    refreshPage();
  }, [movieId]);

  const renderPageHeader = () => (
    <AppHeader
      title={screenTitle}
      safePaddingEnabled
      transparentBackgroundEnabled={false}
    />
  );

  const renderPageFooter = () => (
    <View style={styles.footerView}>
      <PrimaryCTA title={'Book Ticket'} onPress={onBookCTA} />
    </View>
  );

  const renderPageLayout = () => (
    <ScrollView
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.screenScrollableView}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refreshPage} />
      }>
      <View style={styles.detailsView}>
        <PlayerBox movieId={movieId} />
        <DetailsBox movieId={movieId} />
        <CTAsPanelBox movieId={movieId} />
      </View>

      {/* Widgets */}
      <SimilarMoviesWidget movieId={movieId} />
      <MoviesReviewsWidget movieId={movieId} />
    </ScrollView>
  );

  return (
    <View style={styles.screenView}>
      {renderPageHeader()}
      {renderPageLayout()}
      {renderPageFooter()}
    </View>
  );
};

export default MovieDetailsScreen;

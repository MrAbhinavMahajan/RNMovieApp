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
import {APP_PAGES_MAP} from '~/src/constants/Navigation';
import {PageEvent} from '@constants/AppInterfaces';
import {styles} from './styles';
import AppHeader from '@components/common/AppHeader';
import DetailsBox from './DetailsBox';
import PlayerBox from './PlayerBox';
import CTAsPanelBox from './CTAsPanelBox';
import SimilarMoviesWidget from '@components/widgets/SimilarMovies';
import MoviesReviewsWidget from '@components/widgets/MovieReviews';
import {parseQueryParams} from '~/src/utilities/App';

interface MovieDetailsScreenProps {
  route: {
    params: {
      queryParams: {
        movieName: string;
        movieId: number;
      };
      payload?: string; // for deep link params
    };
  };
}

const MovieDetailsScreen = (props: MovieDetailsScreenProps) => {
  const setLastWatchedMovieId = useMovieStore(
    state => state.setLastWatchedMovieId,
  );
  const scrollRef = useRef(null);
  const {queryParams, payload} = props.route?.params || {};
  const getInitialPageConfig = () => {
    if (!!payload) {
      const params = parseQueryParams(payload);
      return {
        movieId: +params?.movieId,
        movieName: params?.movieName,
      };
    }
    return queryParams;
  };
  const {movieName, movieId} = getInitialPageConfig() || {};
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
      title={movieName}
      safePaddingEnabled
      transparentBackgroundEnabled={false}
    />
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
        <CTAsPanelBox movieId={movieId} movieName={movieName} />
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
    </View>
  );
};

export default MovieDetailsScreen;

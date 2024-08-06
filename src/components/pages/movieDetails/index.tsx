/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import useMovieStore from '@store/useMovieStore';
import {PAGE_REFRESH} from '@constants/Page';
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

  const refreshPage = () => {
    NativeAppEventEmitter.emit(PAGE_REFRESH.MOVIE_DETAILS_SCREEN);
  };

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
    </View>
  );
};

export default MovieDetailsScreen;

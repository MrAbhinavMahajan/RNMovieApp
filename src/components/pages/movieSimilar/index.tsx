/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {styles} from './styles';
import RecommendedMoviesWidget from '../../widgets/RecommendedMovies';
import {PAGE_REFRESH} from '../../../constants/Page';

interface MovieSimilarScreenProps {}

const MovieSimilarScreen = (props: MovieSimilarScreenProps) => {
  const scrollRef = useRef(null);

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
        <RecommendedMoviesWidget />
      </ScrollView>
    </View>
  );
};

export default MovieSimilarScreen;

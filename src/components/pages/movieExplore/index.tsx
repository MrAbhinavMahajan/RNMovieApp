/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {styles} from './styles';
import QuotationWidget from '../../widgets/Quotation';
import {PAGE_REFRESH} from '@constants/Page';
import SimilarMoviesWidget from '../../widgets/SimilarMovies';
import RecommendedMoviesWidget from '../../widgets/RecommendedMovies';

const MovieExploreScreen = (props: any) => {
  const scrollRef = useRef(null);

  const refreshPage = () => {};

  useEffect(() => {
    NativeAppEventEmitter.addListener(
      PAGE_REFRESH.MOVIE_DETAILS_SCREEN,
      refreshPage,
    );
  }, []);

  return (
    <View style={styles.screenView}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.screenScrollableView}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshPage} />
        }>
        <SimilarMoviesWidget />
        <RecommendedMoviesWidget widgetTitle={'Blockbuster Buzz'} />
        <QuotationWidget
          title={`Explore!`}
          subtitle={'Crafted with ❤️ in Chamba, India'}
        />
      </ScrollView>
    </View>
  );
};

export default MovieExploreScreen;

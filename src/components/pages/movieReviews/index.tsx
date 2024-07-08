/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {styles} from './styles';
import {PAGE_REFRESH} from '@constants/Page';
import {APP_QUERY_MAP} from '@constants/Api';
import QuotationWidget from '@components/widgets/Quotation';
import MoviesReviewsWidget from '@components/widgets/MovieReviews';

interface MovieReviewsScreenProps {}

const MovieReviewsScreen = (props: MovieReviewsScreenProps) => {
  const queryClient = useQueryClient();
  const scrollRef = useRef(null);
  const refreshPage = () => {
    queryClient.refetchQueries({
      queryKey: [APP_QUERY_MAP.MOVIE_REVIEWS],
      type: 'all',
    });
  };

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
        <MoviesReviewsWidget />
        <QuotationWidget
          title={'Reviews!'}
          subtitle={'Crafted with ❤️ in Chamba, India'}
        />
      </ScrollView>
    </View>
  );
};

export default MovieReviewsScreen;

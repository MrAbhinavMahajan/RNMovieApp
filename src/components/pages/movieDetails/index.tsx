/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {styles} from './styles';
import {PAGE_REFRESH} from '../../../constants/Page';
import MovieDetailsTab from '../../tabs/movieDetails';
import MovieDetailsScreenHeader from './header';
import AppCTA from '../../common/AppCTA';
import {AppBackIcon} from '../../common/RNIcon';
import {goBack} from '../../../service/Navigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
  const scrollRef = useRef(null);
  const insets = useSafeAreaInsets();
  const {queryParams} = props.route?.params || {};
  const {screenTitle, movieId} = queryParams;

  const onPageRefresh = () => {
    NativeAppEventEmitter.emit(PAGE_REFRESH.MOVIE_DETAILS_SCREEN);
  };

  return (
    <View style={styles.screenView}>
      <AppCTA onPress={goBack} style={[styles.headerView, {top: insets.top}]}>
        <AppBackIcon />
      </AppCTA>

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.screenScrollableView}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        <MovieDetailsScreenHeader screenTitle={screenTitle} movieId={movieId} />
        <MovieDetailsTab />
      </ScrollView>
    </View>
  );
};

export default MovieDetailsScreen;

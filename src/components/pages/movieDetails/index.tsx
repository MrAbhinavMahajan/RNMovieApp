/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';
import {PAGE_REFRESH} from '../../../constants/Page';

interface MovieDetailsScreenProps {
  route: {
    params: {
      queryParams: {
        screenTitle: string;
      };
    };
  };
}

const MovieDetailsScreen = (props: MovieDetailsScreenProps) => {
  const scrollRef = useRef(null);
  const {queryParams} = props.route?.params;
  const {screenTitle} = queryParams;

  const onPageRefresh = () => {
    NativeAppEventEmitter.emit(PAGE_REFRESH.MOVIE_DETAILS_SCREEN);
  };

  return (
    <View style={styles.screenView}>
      <AppHeader title={screenTitle} />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.screenScrollableView}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        {/* Tabs */}
      </ScrollView>
    </View>
  );
};

export default MovieDetailsScreen;

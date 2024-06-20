/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';
import PopularMoviesWidget from '../../widgets/PopularMovies';

const MovieSearchScreen = () => {
  const onPageRefresh = () => {};

  return (
    <View style={styles.screenView}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        <AppHeader />
        <PopularMoviesWidget />
      </ScrollView>
    </View>
  );
};

export default MovieSearchScreen;

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';
import PopularMoviesWidget from '../../widgets/PopularMovies';
import {ScrollToTopCTA} from '../../common/AppCTA';

const MovieSearchScreen = () => {
  const scrollRef = useRef(null);
  const onPageRefresh = () => {};

  return (
    <View style={styles.screenView}>
      <AppHeader title={'Movies'} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.screenScrollableView}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        <PopularMoviesWidget />
      </ScrollView>
      <ScrollToTopCTA scrollRef={scrollRef} styles={[styles.scrollToTopBtn]} />
    </View>
  );
};

export default MovieSearchScreen;

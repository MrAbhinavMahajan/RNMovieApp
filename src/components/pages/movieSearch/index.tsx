/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from './styles';
import PopularMoviesWidget from '../../widgets/PopularMovies';
import {ScrollToTopCTA} from '../../common/AppCTA';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {STD_VERTICAL_SPACING} from '../../../constants/Styles';

const MovieSearchScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);
  const onPageRefresh = () => {};

  return (
    <View
      style={[
        styles.screenView,
        {paddingTop: insets.top + STD_VERTICAL_SPACING},
      ]}>
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

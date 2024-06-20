import React, {useRef} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';
import {ScrollToTopCTA} from '../../common/AppCTA';

const WatchlistScreen = () => {
  const scrollRef = useRef(null);
  const onPageRefresh = () => {};

  return (
    <View style={styles.screenView}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        <AppHeader title={'Watchlist'} />
      </ScrollView>
      <ScrollToTopCTA scrollRef={scrollRef} styles={[styles.scrollToTopBtn]} />
    </View>
  );
};

export default WatchlistScreen;

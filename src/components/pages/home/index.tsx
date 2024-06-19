/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {ShadowedView} from 'react-native-fast-shadow';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';
import RNImage from '../../common/RNImage';
import AppCTA from '../../common/AppCTA';
import TrendingMoviesWidget from '../../widgets/TrendingMovies';
import UpcomingMoviesWidget from '../../widgets/UpcomingMovies';
import TopRatedMoviesWidget from '../../widgets/TopRatedMovies';
import NowPlayingMoviesWidget from '../../widgets/NowPlaying';
import QuotationWidget from '../../widgets/Quotation';

const HomeScreen = () => {
  const imageURL =
    'https://media.licdn.com/dms/image/D5603AQEwgqk61oy06Q/profile-displayphoto-shrink_400_400/0/1713561898723?e=1723680000&v=beta&t=bvo0MwBiuhn4XpTHH0vWO5xr_VK6osWdSXn_KFtWseM';

  const openHamburger = () => {};

  useEffect(() => {
    return () => {
      NativeAppEventEmitter.removeAllListeners('HOME_PAGE_REFRESH');
    };
  }, []);

  const onPageRefresh = () => {
    // Emit HomePage Refresh Event
    NativeAppEventEmitter.emit('HOME_PAGE_REFRESH');
  };

  const headerLeftCTA = () => {
    return (
      <ShadowedView style={styles.headerLeftCTAShadow}>
        <View style={styles.headerLeftCTA}>
          <AppCTA onPress={openHamburger}>
            <RNImage
              imageURL={imageURL}
              imageViewStyles={styles.headerLeftCTAImage}
            />
          </AppCTA>
        </View>
      </ShadowedView>
    );
  };

  return (
    <View style={styles.screenView}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        <AppHeader LeftComponent={headerLeftCTA()} title="Show Time" />
        <TrendingMoviesWidget />
        <NowPlayingMoviesWidget />
        <UpcomingMoviesWidget />
        <TopRatedMoviesWidget />
        <QuotationWidget />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

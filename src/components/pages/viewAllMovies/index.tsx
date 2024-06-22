/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  NativeAppEventEmitter,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';
import {PAGE_REFRESH} from '../../../constants/Page';

interface ViewAllMoviesScreenProps {
  route: {
    params: {
      queryParams: {
        screenTitle: string;
      };
    };
  };
}

const ViewAllMoviesScreen = (props: ViewAllMoviesScreenProps) => {
  const {queryParams} = props.route?.params;
  const {screenTitle} = queryParams;
  useEffect(() => {
    return () => {
      NativeAppEventEmitter.removeAllListeners(
        PAGE_REFRESH.MOVIE_DETAILS_SCREEN,
      );
    };
  }, []);

  const onPageRefresh = () => {
    // Emit HomePage Refresh Event
    NativeAppEventEmitter.emit(PAGE_REFRESH.MOVIE_DETAILS_SCREEN);
  };

  return (
    <View style={styles.screenView}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        <AppHeader title={screenTitle} />
        {/* Tab Bar */}
      </ScrollView>
    </View>
  );
};

export default ViewAllMoviesScreen;

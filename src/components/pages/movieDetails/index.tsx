/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';

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
  const {queryParams} = props.route?.params;
  const {screenTitle} = queryParams;
  const onPageRefresh = () => {};

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

export default MovieDetailsScreen;

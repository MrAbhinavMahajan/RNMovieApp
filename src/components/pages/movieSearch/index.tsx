/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {useFocusEffect} from '@react-navigation/native';
import {onPageLeaveEvent, onPageViewEvent} from '~/src/analytics';
import {APP_PAGES_MAP} from '@constants/Navigation';
import {PageEvent} from '@constants/AppInterfaces';
import {styles} from './styles';
import PopularMoviesWidget from './PopularMovies';
import SearchedResultsWidget from './SearchedResults';

interface MovieSearchScreenProps {
  route: {
    params: {
      queryParams: {
        searchedText: string;
      };
    };
  };
}

const MovieSearchScreen = (props: MovieSearchScreenProps) => {
  const {queryParams} = props.route?.params || {};
  const {searchedText} = queryParams || {};
  const headerHeight = useHeaderHeight();
  const analyticsEvent: PageEvent = {
    pageID: APP_PAGES_MAP.SEARCH_SCREEN,
    extraData: {
      ...queryParams,
    },
  };

  useFocusEffect(
    useCallback(() => {
      onPageViewEvent(analyticsEvent);
      return () => {
        onPageLeaveEvent(analyticsEvent);
      };
    }, []),
  );

  return (
    <View style={[styles.screenView, {paddingTop: headerHeight}]}>
      {searchedText?.length > 0 && (
        <SearchedResultsWidget searchedText={searchedText} />
      )}
      <View
        style={{display: searchedText?.length > 0 ? 'none' : 'flex'}}
        pointerEvents={searchedText?.length > 0 ? 'none' : 'auto'}>
        <PopularMoviesWidget />
      </View>
    </View>
  );
};

export default MovieSearchScreen;

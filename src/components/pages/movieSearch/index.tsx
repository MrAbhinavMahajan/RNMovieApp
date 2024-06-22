/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import PopularMoviesWidget from '../../widgets/PopularMovies';
import {useHeaderHeight} from '@react-navigation/elements';
import SearchedResultsWidget from '../../widgets/SearchedResults';

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
  const {searchedText} = props?.route?.params?.queryParams || {};
  const headerHeight = useHeaderHeight();

  return (
    <View style={[styles.screenView, {paddingTop: headerHeight}]}>
      {searchedText?.length > 0 && (
        <SearchedResultsWidget searchedText={searchedText} />
      )}
      <View style={{display: searchedText?.length > 0 ? 'none' : 'flex'}}>
        <PopularMoviesWidget />
      </View>
    </View>
  );
};

export default MovieSearchScreen;

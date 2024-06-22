/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useRef} from 'react';
import {FlatList} from 'react-native';
import MovieItem from '../../pages/home/MovieItem';
import {styles} from './styles';
import {fetchSearchedMovieResults} from '../../../apis/Main';
import {SCREEN_WIDTH} from '../../../utilities/AppUtils';

interface SearchedResultsWidgetProps {
  searchedText: string;
}

const SearchedResultsWidget = (props: SearchedResultsWidgetProps) => {
  const {searchedText} = props;
  console.log('SearchedResultsWidget::: ', searchedText);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['searchedMovies'],
    queryFn: () => fetchSearchedMovieResults(searchedText),
  });
  console.log('searchedMovies :::', query);
  const {data, error, isLoading, isSuccess, refetch} = query;
  const listRef = useRef(null);

  useEffect(() => {
    if (searchedText) {
      refetch();
    }
  }, [searchedText]);

  return (
    <FlatList
      ref={listRef}
      data={data?.results || []}
      renderItem={data => {
        return <MovieItem {...data} style={styles.movieItem} />;
      }}
      keyExtractor={item => `${item?.id}`}
      numColumns={3}
      contentInsetAdjustmentBehavior={'automatic'}
      columnWrapperStyle={styles.columnWrapperView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollableContentView}
      style={styles.containerView}
    />
  );
};

export default SearchedResultsWidget;

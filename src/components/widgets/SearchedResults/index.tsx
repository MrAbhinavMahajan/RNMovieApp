/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useRef} from 'react';
import {FlatList} from 'react-native';
import MoviePosterWidget from '../MoviePoster';
import {styles} from './styles';
import {fetchSearchedMovieResults} from '../../../apis/Main';

interface SearchedResultsWidgetProps {
  searchedText: string;
}

const SearchedResultsWidget = (props: SearchedResultsWidgetProps) => {
  const {searchedText} = props;
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['searchedMovies'],
    queryFn: () => fetchSearchedMovieResults(searchedText),
  });
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
        return (
          <MoviePosterWidget {...data} containerStyles={styles.moviePoster} />
        );
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

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {styles} from './styles';
import AppHeader from '../../common/AppHeader';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchUpcomingMovies} from '../../../apis/Main';
import MovieItem from '../home/MovieItem';

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
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: fetchUpcomingMovies,
  });
  console.log('upcomingMovies: \n', query);
  const {data, error, isLoading, isSuccess, refetch} = query;
  const {queryParams} = props.route?.params;
  const {screenTitle} = queryParams;
  const listRef = useRef(null);

  const onPageRefresh = () => {
    refetch();
  };

  return (
    <View style={styles.screenView}>
      <AppHeader title={screenTitle} />
      <FlatList
        ref={listRef}
        data={data?.results || []}
        renderItem={data => {
          return <MovieItem {...data} />;
        }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }
        keyExtractor={item => `${item?.id}`}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapperView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollableContentView}
      />
    </View>
  );
};

export default ViewAllMoviesScreen;

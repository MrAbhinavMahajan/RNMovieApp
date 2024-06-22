import React, {useEffect, useRef} from 'react';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchUpcomingMovies} from '../../../apis/Main';
import MovieItem from '../../pages/home/MovieItem';
import {styles} from './styles';
import HeaderTitleWidget from '../HeaderTitle';

const UpcomingMoviesWidget = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: fetchUpcomingMovies,
  });
  console.log('upcomingMovies: \n', query);
  const {data, error, isLoading, isSuccess, refetch} = query;

  const listRef = useRef(null);

  const refreshWidget = () => {
    refetch();
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);

  return (
    <View>
      <HeaderTitleWidget
        title={'Coming Soon'}
        containerStyles={styles.headerView}
      />
      <FlatList
        ref={listRef}
        data={data?.results || []}
        renderItem={data => {
          return <MovieItem {...data} />;
        }}
        keyExtractor={item => `${item?.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollableContentView}
      />
    </View>
  );
};

export default UpcomingMoviesWidget;

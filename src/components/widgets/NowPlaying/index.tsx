import React, {useEffect, useRef} from 'react';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchNowPlayingMovies} from '../../../apis/Main';
import * as NavigationService from '../../../service/Navigation';
import {kROUTES} from '../../../constants/Navigation';
import {styles} from './styles';
import MovieItem from '../../pages/home/MovieItem';
import HeaderTitleWidget from '../HeaderTitle';

const NowPlayingMoviesWidget = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: fetchNowPlayingMovies,
  });
  console.log('nowPlayingMovies:\n', query);
  const {data, error, isLoading, isSuccess, refetch} = query;
  const listRef = useRef(null);

  const refreshWidget = () => {
    refetch();
  };

  const onViewAllAction = () => {
    NavigationService.navigate(kROUTES.VIEW_ALL_MOVIES_SCREEN, {
      queryParams: {
        screenTitle: 'Now Playing Movies',
      },
    });
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);

  return (
    <View>
      <HeaderTitleWidget
        title={'Now Playing'}
        containerStyles={styles.headerView}
        rightCTAAction={onViewAllAction}
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

export default NowPlayingMoviesWidget;

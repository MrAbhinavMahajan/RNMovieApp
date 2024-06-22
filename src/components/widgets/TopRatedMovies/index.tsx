import React, {useEffect, useRef, useState} from 'react';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchTopRatedMovies} from '../../../apis/Main';
import * as NavigationService from '../../../service/Navigation';
import {kROUTES} from '../../../constants/Navigation';
import {styles} from './styles';
import MovieItem from '../../pages/home/MovieItem';
import HeaderTitleWidget from '../HeaderTitle';

const TopRatedMoviesWidget = () => {
  const queryClient = useQueryClient(); // * Access the TanStack Query Client
  const query = useQuery({
    queryKey: ['topRatedMovies'],
    queryFn: fetchTopRatedMovies,
  });
  console.log('topRatedMovies: \n', query);
  const {data, error, isLoading, isSuccess, refetch} = query;
  const listRef = useRef(null);
  const [isRightCTAEnabled, setRightCTAEnabled] = useState(false);

  const refreshWidget = () => {
    refetch();
  };

  const onViewAllAction = () => {
    NavigationService.navigate(kROUTES.VIEW_ALL_MOVIES_SCREEN, {
      queryParams: {
        screenTitle: 'Top Rated Movies',
      },
    });
  };

  const onScroll = (event: any) => {
    const listScrollPos = event?.nativeEvent?.contentOffset?.x || 0;
    setRightCTAEnabled(listScrollPos > 120);
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);

  return (
    <View>
      <HeaderTitleWidget
        title={'Top Rated'}
        containerStyles={styles.headerView}
        rightCTAAction={onViewAllAction}
        rightCTAEnabled={isRightCTAEnabled}
      />
      <FlatList
        ref={listRef}
        onScroll={onScroll}
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

export default TopRatedMoviesWidget;

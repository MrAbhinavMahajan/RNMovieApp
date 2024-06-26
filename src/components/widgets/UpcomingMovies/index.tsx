import React, {useEffect, useRef, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import * as NavigationService from '../../../service/Navigation';
import {FlatList, NativeAppEventEmitter, View} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';
import {fetchUpcomingMovies} from '../../../apis/Main';
import {APP_PAGES_MAP, APP_WIDGETS_MAP} from '../../../constants/Navigation';
import {styles} from './styles';
import {FALLBACK_DATA} from '../../data/Main';
import MoviePosterWidget from '../MoviePoster';
import HeaderTitleWidget from '../HeaderTitle';

const UpcomingMoviesWidget = () => {
  const page = 1;
  const query = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: ({signal}) => fetchUpcomingMovies(signal, page),
  });
  console.log('upcomingMovies: \n', query);
  const {data, isLoading, refetch} = query;

  const listRef = useRef(null);
  const [isRightCTAEnabled, setRightCTAEnabled] = useState(false);

  const refreshWidget = () => {
    refetch();
  };

  const onViewAllAction = () => {
    NavigationService.navigate(APP_PAGES_MAP.MOVIE_VIEW_ALL_SCREEN, {
      queryParams: {
        screenTitle: 'Coming Soon Movies',
        widgetId: APP_WIDGETS_MAP.UPCOMING_MOVIES,
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
    <View
      style={styles.containerView}
      pointerEvents={isLoading ? 'none' : 'auto'}>
      <HeaderTitleWidget
        title={'Coming Soon'}
        containerStyles={styles.headerView}
        rightCTAAction={onViewAllAction}
        rightCTAEnabled={isRightCTAEnabled}
        loaderEnabled={!data?.results}
      />
      <FlatList
        ref={listRef}
        onScroll={onScroll}
        data={data?.results ?? FALLBACK_DATA}
        renderItem={({item, index}) => {
          return (
            <MoviePosterWidget
              item={item}
              index={index}
              containerStyles={styles.moviePoster}
            />
          );
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
